export interface IDocumentStatus {
    code: number,
    title: string,
    color: string,
    href?: string,
};

export interface IHistoryMapping {
    key: string,
    name: string
};

export const CONTANST_DOCUMENT = [
    'GET_LIST_DOCUMENT_INPUT',
    'GET_LIST_DOCUMENT_WAITTING',
    'GET_LIST_DOCUMENT_PROCESSING',
    'GET_LIST_DOCUMENT_FEE',
    'GET_LIST_DOCUMENT_REJECT',
    'GET_LIST_DOCUMENT_CANCEL',
    'GET_LIST_DOCUMENT_TEMPORY_CLOSE',
    'GET_LIST_DOCUMENT_CLOSE',
    'GET_LIST_DOCUMENT_ONLINE',
    'GET_LIST_DOCUMENT_COMPLETE',
    'GET_LIST_DOCUMENT_STAMP',
];

export const HistoryMapping: IHistoryMapping[] = [
    {
        key: 'created',
        name: 'Tạo mới hồ sơ'
    },
    {
        key: 'assignee',
        name: 'Phân công cán bộ'
    },
    {
        key: 'updateListBrief',
        name: 'Cập nhật số kế hoạch và công văn'
    },
    {
        key: 'changeStatus',
        name: 'Đổi trạng thái hồ sơ'
    },
    {
        key: 'closeBrief',
        name: 'Đóng hồ sơ'
    },
];

export const DocumentStatus: IDocumentStatus[] = [
    {
        code: 1,
        title: 'Hồ sơ mới',
        color: 'blue',
        href: '/document-input',
    },
    {
        code: 2,
        title: 'Chờ xử lý',
        color: 'purple'
    },
    {
        code: 3,
        title: 'Đang xử lý',
        color: 'cyan'
    },
    {
        code: 4,
        title: 'Trả giấy doanh nghiệp + thu phí',
        color: 'orange'
    },
    {
        code: 5,
        title: 'Từ chối',
        color: 'red'
    },
    {
        code: 6,
        title: 'Hủy',
        color: 'red'
    },
    {
        code: 7,
        title: 'Rút hồ sơ',
        color: 'volcano'
    },
    {
        code: 8,
        title: 'Tạm đóng hồ sơ',
        color: 'volcano',
        href: '/ho-so-tam-dong'
    },
    {
        code: 9,
        title: 'Nộp hồ sơ online',
        color: 'geekblue'
    },
    {
        code: 10,
        title: 'Hoàn thành',
        color: 'green'
    },
    {
        code: 11,
        title: 'Dán tem',
        color: 'gold'
    },
];