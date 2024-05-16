const { decryptPhoneNumber, encryptPhoneNumber } = require("../helper/helper");
const { User } = require("../models");
const { Op } = require("sequelize");
const addContacts = async (req, res) => {
  try {
    let { userId, Contacts } = req.body;

    if (!userId || !Contacts) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Parameters." });
    }

    for (const contact of Contacts) {
      let encryptNumber = await encryptPhoneNumber(contact.number);

      const existingContact = await User.findOne({
        where: { number: encryptNumber },
      });

      if (!existingContact) {
        let commonUsers = JSON.stringify([userId]);
        const savedContact = await User.create({
          userId,
          name: contact.name,
          number: encryptNumber,
          commonUser: commonUsers,
        });
      } else {
        const [savedContact, created] = await User.findOrCreate({
          where: { name: contact.name, userId },
          defaults: { userId, name: contact.name },
        });

        let commonUsers = existingContact.commonUser
          ? JSON.parse(existingContact.commonUser)
          : [];

        if (!commonUsers.includes(userId)) {
          commonUsers.push(userId);
          await existingContact.update(
            { commonUser: JSON.stringify(commonUsers) },
            { where: { number: encryptNumber } }
          );
        }
      }
    }

    return res
      .status(201)
      .json({ success: true, message: "data saved successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const getCommonUsers = async (req, res) => {
  try {
    let { searchNumber } = req.query;
    let encryptNumber = await encryptPhoneNumber(searchNumber);
    const userContact = await User.findOne({
      where: { number: encryptNumber },
    });

    let response = {
      Name: userContact.name,
      commonUsers: JSON.parse(userContact.commonUser),
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const searchContacts = async (req, res) => {
  try {
    let { searchText, userId, PageSize, page } = req.query;

    if (!searchText && !userId) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Parameters" });
    }

    const pageSize = parseInt(PageSize) || 10;
    const currentPage = parseInt(page) || 1;

    let filter = {
      number: {
        [Op.not]: null,
      },
    };

    if (searchText) {
      filter.name = { [Op.like]: `%${searchText}%` };
    }

    if (userId) {
      filter.userId = userId;
    }

    let contacts = await User.findAndCountAll({
      where: filter,
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      attributes: ["name", "number"],
    });

    for (let i = 0; i < contacts.rows.length; i++) {
      let x = contacts.rows[i];
      let number = await decryptPhoneNumber(x.number);
      x.number = number;
    }

    const response = {
      currentPage,
      totalCount: contacts.count,
      rows: contacts.rows,
    };

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { addContacts, getCommonUsers, searchContacts };
