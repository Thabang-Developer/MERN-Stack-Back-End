const { sendResponseInfo } = require("../response/sendResponse");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    sendResponseInfo(200, doc, res, req.baseUrl, req.method);
})

exports.getOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findById({ _id: req.params.id });

    if (!doc) {
        next(new AppError('No document fount with that id.'), 404)
    }

    sendResponseInfo(200, doc, res, req.baseUrl, req.method);
})

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete({ _id: req.params.id });
    if (!doc) {
        next(new AppError('No document fount with that id.'), 404)
    }

    sendResponseInfo(200, doc, res, req.baseUrl, req.method);
})

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
        { _id: req.params.id }, 
        req.body,
        { 
            new: true,
            runValidator: true
        }
    );

    if (!doc) {
        next(new AppError('No document fount with that id.'), 404);
    }

    sendResponseInfo(200, doc, res, req.baseUrl, req.method);
})