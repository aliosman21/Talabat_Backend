
const HandleProviderDataForClintSide = (OriginalData) => {
    // todo: check super_user
    data = {
        Email : OrignalData.email,
        name : OrignalData.name,
        Reviews_count : OrignalData.reviews_count,
        Latitude : OrignalData.latitude,
        Longitude : OrignalData.longitude,
        Address : OrignalData.formatted_address,
        Opening_hour : OrignalData.opening_hour,
        Closing_hour : OrignalData.closing_hour,
        Delivery_fee : OrignalData.Delivery_fee,
        Logo : OrignalData.logo,
        Delivery_time : OrignalData.delivery_time,
        Provider_state : OrignalData.provider_state,
        Minimum_order : OrignalData.minimum_order,
        Country : OrignalData.country,
        rating : OrignalData.rating,
        super_user : OrignalData.super_user_id,
    }
    return data

}

module.exports = HandleProviderDataForClintSide;
