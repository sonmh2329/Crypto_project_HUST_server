const { type } = require("express/lib/response");
const Emails = require("../model/emails");

class EmailsController {
  async create(req, res, next) {
    try {
      let { body } = req;
      body.content = req.body.encryptedData;
      let result = await Emails.create(body);
      if (result) {
        res.status(201).json({
          status: "sucess",
          data: result,
        });
      } else {
        throw new Error("Created error!");
      }
    } catch (error) {
      res.status(400).json({
        status: error.status,
        message: error.message,
      });
    }
  }
  async search(req, res, next) {
    try {
      let data = await Emails.find({});
      if (data) {
        res.status(200).json({
          status: "success",
          data: data,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async getById(req, res, next) {
    try {
      let data = await Emails.findOne({ _id: req.params.id });
      if (data) {
        res.locals.dataEncryptedArr = [data];
        next();
      } else {
        res.status(404).json({
          status: "error",
          message: "No Emails found!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async getBySenderId(req, res, next) {
    try {
      let senderId = req?.query?.id;
      let arrData = await Emails.find({ senderId: senderId });
      if(arrData?.length > 0) {
          res.locals.dataEncryptedArr = arrData;
          next();
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async getByReceiverId(req, res, next) {
    try {
      let receiverId = req?.query?.id;
      let arrData = await Emails.find({ receiverId: receiverId });
      if(arrData?.length > 0) {
          res.locals.dataEncryptedArr = arrData;
          next();
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new EmailsController();
