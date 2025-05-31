export interface Component {
    componentName: string
    label: string
    url: string
    content?: string
}

export interface Group {
    [key: string]: Component
}

export interface Category {
    // eslint-disable-next-line no-undef
    icon: JSX.Element
    label: string
    group?: Group
    content?: {
        [key: string]: Component
    }
}
