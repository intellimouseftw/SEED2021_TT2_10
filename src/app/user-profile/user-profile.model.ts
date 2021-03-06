export interface UserDetailResponse {

    custID: number;
    firstName: string;
    lastName: string;
    nric: string;
    gender: string;
    age: number;
    phoneNumber: string;
    email: string;
    address: string;
}

export interface AccountDetailResponse {
    accountName: string;
    accountNumber: number;
    availableBal: number;
    linked: boolean;
}

export interface AccountBalanceRequest {
    custID: number;
    Amount: number;
}

export interface AccountBalanceResponse {
    statusCode: string;
    message: string;
}