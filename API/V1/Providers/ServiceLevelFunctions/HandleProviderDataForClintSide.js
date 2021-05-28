
const HandleProviderDataForClintSide = (OriginalData) => {
    // todo: check super_user


    data = {
        Email : OriginalData.email,
        name : OriginalData.name,
        Reviews_count : OriginalData.reviews_count,
        Latitude : OriginalData.latitude,
        Longitude : OriginalData.longitude,
        Address : OriginalData.formatted_address,
        Opening_hour : OriginalData.opening_hour,
        Closing_hour : OriginalData.closing_hour,
        Delivery_fee : OriginalData.Delivery_fee,
        Logo : OriginalData.logo,
        Delivery_time : OriginalData.delivery_time,
        Provider_state : OriginalData.provider_state,
        Minimum_order : OriginalData.minimum_order,
        Country : OriginalData.country,
        rating : OriginalData.rating,
        super_user : OriginalData.super_user_id,
        deleted : OriginalData.deletedAt,
    }
    return data

}

module.exports = HandleProviderDataForClintSide;
