const express = require('express');
const router = express.Router();
const ownerController = require('./../controllers/risk-owner.controller.js');

router
    .route('/')
    .post(ownerController.createRiskOwner)
    .get(ownerController.getAllOwners)

router
    .route('/:id')
    .get(ownerController.getOneOwner)
    .patch(ownerController.updateOwner)
    .delete(ownerController.deleteOwner)

module.exports = router;