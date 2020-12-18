import type fb from 'firebase';

export interface AuthCredential {
  email: string
  password: string
}

export interface User extends AuthCredential {
  fullname: string
}

export interface Complaint {
  title: string
  description: string
  attachments: File[]
}

export interface WithTimestamp {
  _created: fb.firestore.Timestamp,
  _updated: fb.firestore.Timestamp,
  _deleted: fb.firestore.Timestamp,
}

export interface fbCommonError {
  message: string
  code: string
}

export namespace q {
  export namespace Table {
    export interface BodyProps {
      key: unknown
      row: Record<string, unknown>
      rowIndex: number
      pageIndex: number
      cols: Record<string, unknown>
      colsMap: Record<string, unknown>
      sort: (col: string | Record<string, unknown>) => void
      selected: boolean
      expand: boolean
      color: string
      dark: boolean
      dense: boolean
      __trClass: string
    }

    export interface Column<T = Record<string, unknown>> {
      name: string
      label: string
      field: string | ((row: T) => unknown)
      required?: boolean
      align?: 'left' | 'center' | 'right'
      sortable?: boolean
      sort?: () => unknown
      format?: (v: unknown) => string
      style?: string
      classes?: string
      headerStyle?: string
      headerClasses?: string
    }
  }
}
