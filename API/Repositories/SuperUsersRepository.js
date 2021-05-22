const db = require("../../db/models/index");

const selection = async () => {
   // const letsSee = await db.Provider.findOne({
   //    where: {
   //       email: "lolo@gamil.com",
   //    },
   //    include: db.Category,
   // });
   // const letsSee = await db.SuperUser.findOne({
   //    where: {
   //       email: "amrali975@gamil.com",
   //    },
   // });
   // console.log(ali);
   // letsSee.getProviders();
   // console.log(JSON.stringify(letsSee.getProviders(), null, 2));
   // console.log(JSON.stringify(letsSee, null, 2));
};
const insertIntoSuperUser = async () => {
   try {
      // await db.Provider.destroy({
      //    where: {
      //       email: "lolo@gamil.com",
      //    },
      //    individualHooks: true,
      // });
      // await db.Provider.restore({
      //    where: {
      //       email: "lolo@gamil.com",
      //    },
      //    individualHooks: true,
      // });
      //--------------------------------------------------------------------------
      // const superUser = await db.SuperUser.create({
      //    email: "amrali975@gamil.com",
      //    password: "123",
      //    name: "Ali",
      // });
      //------------------------------------------------------------------------
      // const category = await db.Category.create({
      //    name: "SomeNameA",
      //    provider_id: "0f50660d-6308-49de-98df-b84486a3fa4e",
      // });
      // const category1 = await db.Category.create({
      //    name: "SomeNameB",
      //    provider_id: "0f50660d-6308-49de-98df-b84486a3fa4e",
      // });
      // const category2 = await db.Category.create({
      //    name: "SomeNameC",
      //    provider_id: "0f50660d-6308-49de-98df-b84486a3fa4e",
      // });
      //------------------------------------------------------------------------
      // const provider = await db.Provider.create({
      //    email: "lolo@gamil.com",
      //    password: "123",
      //    name: "amr",
      //    reviews_count: 3,
      //    latitude: "31.1951084",
      //    longitude: "29.9391237",
      //    provider_type: "Restaurant",
      //    coverage_zone: "24",
      //    opening_hour: Date.now(),
      //    closing_hour: Date.now(),
      //    delivery_fee: "50",
      //    logo: "image_path",
      //    provider_state: "active",
      //    minimum_order: "200",
      //    country: "Egypt",
      //    rating: "4",
      //    delivery_time: Date.now(),
      // });
      //------------------------------------------------------------------------
      // const letsSee = await db.Provider.findOne({
      //    where: {
      //       email: "lolo@gamil.com",
      //    },
      //    include: db.Provider_Payment_Options,
      // });
      // console.log(JSON.stringify(letsSee, null, 2));
      //------------------------------------------------------------------------
      // const payment_options1 = await db.Provider_Payment_Options.create({
      //    id: "5fc9472b-d353-40ac-9a20-ea4531d2c79b",
      //    name: "gadsgasasdhgsa",
      // });
      // const payment_option2s = await db.Provider_Payment_Options.create({
      //    id: "5fc9472b-d353-40ac-9a20-ea4531d2c79b",
      //    name: "gadgsdagdsashgsa",
      // });
      // const payment_option3s = await db.Provider_Payment_Options.create({
      //    id: "5fc9472b-d353-40ac-9a20-ea4531d2c79b",
      //    name: "gadssdagsadghgsa",
      // });
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   insert: insertIntoSuperUser,
   select: selection,
};
