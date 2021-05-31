
const HandleRestaurantDataForClintSide = (ProviderData) => {
    // todo: add the restaurant menu
    data = {
        RestaurantInfo :
        {
            Email : ProviderData.email,
            name : ProviderData.name,
            Reviews_count : ProviderData.reviews_count,
            Latitude : ProviderData.latitude,
            Longitude : ProviderData.longitude,
            Address : ProviderData.formatted_address,
            Opening_hour : ProviderData.opening_hour,
            Closing_hour : ProviderData.closing_hour,
            Delivery_fee : ProviderData.Delivery_fee,
            Logo : ProviderData.logo,
            Delivery_time : ProviderData.delivery_time,
            Provider_state : ProviderData.provider_state,
            Minimum_order : ProviderData.minimum_order,
            Country : ProviderData.country,
            rating : ProviderData.rating,
            super_user : ProviderData.super_user_id,
            deleted : ProviderData.deletedAt,
//            Categories:ProviderData.Categories
        },
    }
    return data

}

module.exports = HandleRestaurantDataForClintSide;
