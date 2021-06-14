export type Product = {
    _id: string | number,
    pageTitle: string,
    title: string
}

export type ProductVariant = {
    _id: string | number,
    _description: string,
    _categoriesRef: string[],
    name: string,
    sku: string,
    images: string[],
    price: {
        original: number,
        current: number
    }
}
