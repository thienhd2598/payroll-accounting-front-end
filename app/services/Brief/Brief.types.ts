import { type } from 'os';
import { ApiResponse } from 'services/types';

// List brief
interface GetListBriefParams {
    keyword?: string;
    number_receive?: number;
    status?: number;
}

type GetListBriefResponse = ApiResponse<Array<{
    id: number;
    type: string;
    status: string;
    number_receive: string;
    name_contact: string;
    phone_contact: string;
    company_id: string;
    name_project: string;
    created_at: Date;
}>>

// Detail brief
interface DetailBriefUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    address: string;
    status: string;
    gender: string;
    created_at: Date;
}

interface DetailBriefCompany {
    id: number;
    name: string;
    status: string;
    deputy: string;
    position: string;
    address: string;
    phone: string;
    telephone: string;
    fax: string;
    tax_code: string;
    account_number: string;
    bank: string;
    description: String;
    created_at: Date;
}

interface DetailBriefSample {
    id: number;
    brief_id: string;
    category_id: string;
    total_sample: string;
    number_sample_offer: string;
    name: string;
    model: string;
    unit: string;
    year: string;
    total_sample_real: String;
    ghcl: string;
    country: String;
    result: string;
    date_action: String;
    no_report: String;
    date_install: String;
    date_handover: String;
    date_experiment: String;
    date_receipt_report: String;
    time_result: String;
    time_check_real: String;
    reuse_result: string;
    note: String;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    category: {
        id: number;
        name: string;
        model: string;
        unit: string;
        year: string;
        parent_id: string;
        status: string;
        country: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date;
    };
}

type DetailBriefResponse = ApiResponse<{
    id: number;
    number_receive: string;
    type: string;
    status: string;
    name_contact: string;
    phone_contact: string;
    file_authorization_letter: string;
    file_referral: string;
    company_id: string;
    name_project: string;
    address_get_sample: string;
    content: string;
    day_reception: Date;
    date_in_come: Date;
    created_at: Date;
    sample: DetailBriefSample[];
    company: DetailBriefCompany;
} & Record<
    'assignUsers' | 'cooperationUsers' | 'coordinationUsers'
    , DetailBriefUser>>;

interface DetailBriefParams {
    briefId: number
};

// Create brief
interface CreateBriefSample {
    category: string;
    model: string;
    unit: string;
    year: string;
    total_sample: number;
    number_sample_offer: number;
    ghcl: string;
    country: string;
}

interface CreateBriefParams {
    type: number;
    name_contact: string;
    phone_contact: string;
    file_authorization_letter: string;
    file_referral: string;
    company_id: number;
    name_project: string;
    address_get_sample: string;
    content: string;
    day_reception: string;
    date_in_come: string;
    samples: CreateBriefSample[];
}

type CreateBriefResponse =  ApiResponse<{
    id: number;
    number_receive: number;
    type: number;
    status: number;
    name_contact: string;
    phone_contact: string;
    file_authorization_letter: string;
    file_referral: string;
    company_id: number;
    name_project: string;
    address_get_sample: string;
    content: string;
    day_reception: Date;
    date_in_come: Date;
    assignUsers: any[];
    cooperationUsers: any[];
    coordinationUsers: any[];
    created_at: Date;
    company: {
        id: number;
        name: string;
        status: string;
        deputy: string;
        position: string;
        address: string;
        phone: string;
        telephone: string;
        fax: string;
        tax_code: string;
        account_number: string;
        bank: string;
        description: string;
        created_at: Date;
    };
    sample: Array<{
        id: number;
        brief_id: string;
        category_id: string;
        total_sample: string;
        number_sample_offer: string;
        name: string;
        model: string;
        unit: string;
        year: string;
        total_sample_real: string;
        ghcl: string;
        country: string;
        result: string;
        date_action: string;
        no_report: string;
        date_install: string;
        date_handover: string;
        date_experiment: string;
        date_receipt_report: string;
        time_result: string;
        time_check_real: string;
        reuse_result: string;
        note: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date;
    }>;
}>

// Update brief
interface UpdateBriefParams {
    brief_id: number;
    type: number;
    name_contact: string;
    phone_contact: string;
    file_authorization_letter: string;
    file_referral: string;
    company_id: number;
    name_project: string;
    address_get_sample: string;
    content: string;
    day_reception: string;
    date_in_come: string;
    samples: CreateBriefSample[];
}

type UpdateBriefResponse = ApiResponse<any>;

// Update plan number
interface UpdatePlanNumberParams {
    plan_number?: string;
    plan_datetime?: string;
    archive_number?: string;
    archive_datetime?: string;
    deadline?: string;
    brief: number[];
}

type UpdatePlanNumberResponse = ApiResponse<string>;

// Assigne
interface AssigneParams {
    brief_id: number;
    plan_number?: string;
    plan_datetime?: string;
    archive_number?: string;
    archive_datetime?: string;
    deadline?: string;
    assign_user?: number[];
    cooperation_user?: number[];
    coordination_user?: number[];
}

type AssigneResponse = ApiResponse<any>;

// Close brief
interface CloseBriefParams {
    brief_id?: number;
    dispatch_number?: string;
    date_close?: string;
}

type CloseBriefResponse = ApiResponse<any>;

// Open brief
interface OpenBriefParams {
    brief_id?: number;
    date_open?: string;
}

type OpenBriefResponse = ApiResponse<any>;

// Update status
interface UpdateStatusParams {
    brief_id?: number;
    status: number;
};

type UpdateStatusResponse = ApiResponse<any>;

// Submit online 

// List submit online

// Update return company

// History
interface HistoryBriefParams {
    brief_id: number
};

type HistoryBriefResponse = ApiResponse<any[]>;

export type {
    GetListBriefParams, GetListBriefResponse,
    DetailBriefParams, DetailBriefResponse,
    CreateBriefParams, CreateBriefResponse,
    UpdateBriefParams, UpdateBriefResponse,
    UpdatePlanNumberParams, UpdatePlanNumberResponse,
    AssigneParams, AssigneResponse,
    CloseBriefParams, CloseBriefResponse,
    OpenBriefParams, OpenBriefResponse,
    UpdateStatusParams, UpdateStatusResponse,
    HistoryBriefParams, HistoryBriefResponse
};