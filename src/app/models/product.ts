export interface Product{
    _id: String,
    title: String,
    description: String,
    datePosted: Date,
    price: Number,
    currency: String,
    state: String,
    picture: String,
    dateMessage?: String,
    deleted?: Boolean
}