export interface Template {
    name: string;
    key: string;
    thWidth?: string | null | undefined;
    background?: string | null | undefined;
    type?: string;
    checked: boolean;
    isComputable?: boolean;
    computableType?: string;
}
