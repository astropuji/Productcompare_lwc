import gql from 'graphql-tag';

const QUERY = gql`
query($pidList: [String!]) {
    productDetail(pIDList: $pidList){
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
    imageGroups{
  images{
    disBaseLink
    link
  }}
          currency
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
c_dimDepth
      c_dimHeight
      c_dimWeight
      c_dimWidth
      c_resolution
      c_tvSignalFormat
      c_tvSize
      c_tvType
c_batteryLife
c_batteryType
c_digitalCameraPixels
c_digitalCameraType
c_displaySize
c_memoryType
c_memorySize
c_musicStorage
c_portableAudioType
c_gameGenre
c_gameRating
c_gameSystemType
}}
`


export default QUERY;
export const attrTv = ["imageGroups","c_dimDepth","c_dimHeight","c_dimWeight","c_dimWidth","c_resolution","c_tvSignalFormat","c_tvSize","c_tvType"];
export const attrCam = ["imageGroups","c_batteryLife","c_batteryType","c_digitalCameraPixels","c_digitalCameraType","c_dimDepth","c_dimHeight","c_dimWidth","c_displaySize"];
export const attrMp3 = ["imageGroups","c_batteryLife","c_batteryType","c_dimDepth","c_dimHeight","c_dimWeight","c_dimWidth","c_displaySize","c_memorySize","c_musicStorage","c_resolution"];
export const attrGps = ["imageGroups","c_batteryLife","c_batteryType","c_dimDepth","c_dimHeight","c_dimWeight","c_dimWidth","c_displaySize","c_resolution"];
export const attrGame = ["imageGroups","c_gameGenre","c_gameRating","c_gameSystemType"];
export const cgidNames = [{'electronics-televisions':attrTv},{'electronics-digital-cameras':attrCam},
{'electronics-digital-media-players':attrMp3},{'electronics-gps-units':attrGps},{'electronics-gaming':attrGame}];
