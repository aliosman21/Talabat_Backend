const db = require("../../db/models/index");
// const iiiife = (async () => {
//    try {
//       const t = await sequelize.transaction();
//       await db.Provider.destroy(
//          {
//             where: {
//                email: "lolo@gamil.com",
//             },
//             individualHooks: true,
//          },
//          { transaction: t }
//       );
//    } catch (err) {
//       console.log(err);
//    }
// })();
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
      //----------------------------------------------------------------------------------------------\\
      // const category = await db.Category.create({
      //    name: "SomeNameA",
      //    provider_id: provider.id,
      // });
      // const category1 = await db.Category.create({
      //    name: "SomeNameB",
      //    provider_id: provider.id,
      // });
      // const category2 = await db.Category.create({
      //    name: "SomeNameC",
      //    provider_id: provider.id,
      // });
      // const item1 = await db.Item.create({
      //    name: "Burger",
      //    logo: "gasga",
      //    reviews_count: 50,
      //    rating: 5,
      //    old_price: 3.5,
      //    price: 43,
      //    summary: "SOme summary333",
      //    active: false,
      //    category_id: category2.id,
      // });
      // const item2 = await db.Item.create({
      //    name: "Burger",
      //    logo: "gasga",
      //    reviews_count: 50,
      //    rating: 5,
      //    old_price: 3.5,
      //    price: 43,
      //    summary: "SOme summary1",
      //    active: true,
      //    category_id: category1.id,
      // });
      // const item3 = await db.Item.create({
      //    name: "Burgegasdgdr",
      //    logo: "gasga",
      //    reviews_count: 50,
      //    rating: 5,
      //    old_price: 3.5,
      //    price: 43,
      //    summary: "SOme summary2",
      //    active: true,
      //    category_id: category2.id,
      // });
      // const itemOptions = await db.Item_Option.create({
      //    section_name: "7lawa",
      //    section_type: "RadioButton",
      //    item_id: item3.id,
      // });
      // const additional = await db.Additional_Option.create({
      //    option_name: "HGJEWO",
      //    item_option_id: itemOptions.id,
      // });
      //----------------------------------------------------------------------------------------------\\
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
      //------------------------------------------------------------------------
      //------------------------------------------------------------------------
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
