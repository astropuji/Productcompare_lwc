import gql from 'graphql-tag';

const QUERY = gql`
query($pidList: [String]) {
    multipleProducts(pidList: $pidList){
        id
        name
        master{
                    masterId
                    orderable
                    price
                }
                price
                prices{
                    sale
                    list
                }
                currency
                longDescription
                shortDescription
                variants{
                productId
                orderable
                price
                variationValues{
                    color
                    size
                }
                }
                type{
                bundle
                item
                master
                option
                set
                }
                productPromotions{
                calloutMsg
                promotionalPrice
                promotionId
                }
                pageDescription
                pageTitle
                primaryCategoryId
                recommendations{
                recommendedItemId
                recommendedItemLink
                }
    }
    }
`

export default QUERY;