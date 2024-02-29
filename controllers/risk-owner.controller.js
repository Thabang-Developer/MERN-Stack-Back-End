const RiskOwner = require('./../model/risk-owner.model.js');
const AppError = require('./../utils/appError.js');
const processingFunc = require('./../controllers/processingFunc.controller.js');
const catchAsync = require('../utils/catchAsync.js');
const { sendResponseInfo } = require('../response/sendResponse.js');

exports.createRiskOwner = catchAsync(async (req, res, next) => {
    const { name, title, email, role } = req.body;

    if(!name || !title || !email || !role) {
        next(new AppError('Please check your inputs carefully.'), 402);
        return;
    }

    const riskOwner = RiskOwner({
        fullname: name,
        title,
        email,
        role
    })

    const ownerSave = await riskOwner.save();
    if(ownerSave) {
        sendResponseInfo(200, ownerSave, res, req.baseUrl, req.method);
    }
})

exports.getAllOwners = processingFunc.getAll(RiskOwner);
exports.getOneOwner = processingFunc.getOne(RiskOwner);
exports.updateOwner = processingFunc.updateOne(RiskOwner);
exports.deleteOwner = processingFunc.deleteOne(RiskOwner);