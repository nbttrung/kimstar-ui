import {call, fork, put, takeEvery} from "@redux-saga/core/effects";
import {getAccountById, getWeighingStations} from "../../../api/socket";
import {
    setAccountError,
    setAccountSuccess,
    setWeightSlipError,
    setWeightSLipSuccess
} from "../../actions/permission/action";
import {permissionAccountType} from "../../actions/permission/type";

function* onLoadPermissionsAccount(params) {

    try {
        const response = yield call(getAccountById, params.params);
        yield put(setAccountSuccess(response));
    } catch (e) {
        yield put(setAccountError(e))
    }
}

function* onLoadPermissionData() {
    yield takeEvery(permissionAccountType.LOAD_ACCOUNT_START, onLoadPermissionsAccount)
}

function* onLoadPermissionsWeightSlip(params) {

    try {
        const response = yield call(getWeighingStations, params.params);
        yield put(setWeightSLipSuccess(response));
    } catch (e) {
        yield put(setWeightSlipError(e))
    }
}

function* onLoadPermissionDataWeight() {
    yield takeEvery(permissionAccountType.LOAD_WEIGHT_SLIP_START, onLoadPermissionsWeightSlip)
}

const permissionsAccountData = [
    fork(onLoadPermissionData), fork(onLoadPermissionDataWeight)
]

export default permissionsAccountData
