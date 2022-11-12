export const Company_Name=[
{name:"google"},
{name:'facbook'},
{name:'Instagram'},
/* {name:'twitter'},
{name:'Email'} */
]
export const   SEARCH_KEYWORKD=[





]
export const SELECT_BUSINESS_TYPE = [
  { name: "Business & Professionals", value: "businessProfessionals" },
  { name: "Ministries", value: "ministries" },
  { name: "House", value: "house" },
  {name: "Employment", value:"employment"}
  // { name: "Employment" },
];

export const Ministries_Filter=[
  {filter: "Filter By Faith/Denomination"},
  {filter: "Filter By Fellowship Type"},
  {filter: "Filter by Zip/Postal Code"},
  {filter: "Filter By Address"}
]
export const Business_Filter=[
  {filter:"Filter By Business Category"},
  {filter:"Filter By Fellowship"},
  {filter:"Filter by Location  "},
  {filter:"Filter By Address"}
]
export const Housing_Filter=[
  {filter:"This property is For"},
  {filter:"Housing Type"},
  {filter:"Property Type"},
  {filter:"This property is For"},
  {filter:"Available On Date"},
  {filter:"Number of Bedrooms"},
  {filter:"Available On Bathrooms"},
  {filter:"Price(slider)"},
  {filter:"Property size(slider)"},
  {filter:"Pets Allowed"},
  {filter:"Parking"},
  {filter:"Laundry"},
  {filter:"Flooring"},
  {filter:"Furnished"},
  {filter:"Smoking"},
  {filter:"Pool"},
  {filter:"Hot Tub"},
  {filter:"EvCharging"},
  {filter:"WheelChairAccesible"},
  ]
  export const Employment_Filter=[
    {filter:"Search Jobs"},
    {filter:"Location"},
    {filter:"Filter Jobs"},
    {filter:"Payment Range"}
  ]
export const SEARCH_TYPES = {
  business: "Business & Professionals",
  ministries: "Ministries",
  housing: "House",
  employment: "Employment",
};

export const SEARCH_OPTIONS=[
  {
    id: 1,
    name: "Business & Professionals",
  },
  {
    id: 2,
    name: "House",
  },
  {
    id: 3,
    name: "Employment",
  },
  {
    id: 4,
    name: "Ministries",
  }
]





export const HOUSING_TYPE = [{ name: "Private" }, { name: "Shared" }];
export const SELL_STATUS = [
  { name: "Sale" },
  { name: "Rent" },
  { name: "Purchase" },
];
export const PETS_ALLOWED=[
    { name: "Dogs" },
    { name: "Cats" },
    { name: "Birds" },  
]
export const PARKING = [
  { name: "Carport" },
  { name: "Attached Garage" },
  { name: "Detached Garage" },
  { name: "Off-street Parking" },
  { name: "Street Parking" },
  { name: "Valet Parking" },
  { name: "No Parking" },
  ];
  export const LAUNDRY = [
    { name: "Washer/Dryer in Unit" },
    { name: "Washer/Dryer Hookups" },
    { name: "Laundry in Building" },
    { name: "Laundry Onsite" },
    { name: "No Laundry Onsite" },
    ];
    export const FLOORING = [
      { name: "Wood" },
      { name: "Carpet" },
      { name: "Concrete" },
      { name: "Tile" },
      { name: "Other" },
      ];
  export const FURNISHED=[
    {name:"Furnished"}
  ]      
  export const SMOKING=[
    {name:"Smoking"}
  ]
  export const POOL=[
    {name:"Pool"}
  ]
  export const HOTTUB=[
    {name:"Hot Tub"}
  ]
  export const EVCHARGING=[
    {name:"Ev Charging"}
  ]
  export const WHEELCHAIRACCESIBLE=[
    {name:"Wheelchair Accesible"}
  ]

export const HOUSING_PROPERTY_TYPE = [
  { name: "Apartment/Flat" },
  { name: "House" },
  { name: "Condo" },
  { name: "Townhouse" },
  { name: "Duplex" },
  { name: "Manuufactured" },
  { name: "Independent" },
  { name: "Home" },
  { name: "Flat" },
  { name: "Guest House" },
  { name: "Manufactured" },
  { name: "Assisted Living" },
  { name: "Farm/Ranch" },
  { name: "Land" },

];

export const REMOTE_POSITION=[
  {name:"Yes"},
  {name:"No"},
  {name:"Mixed"},
  {name:"Temporarily"}
]
export const JOB_TYPES=[
{id:0,name:"Full-time"},
{id:1,name:"Part-time"},
{id:2,name:"Temporary / Gig"},
{id:3,name:"Contract"},
{id:4,name:"Internship"},
{id:5,name:"Commission"}
]

export const GET_BUSINESS_TYPE = "/comman/getBussinessType";

export const GET_BUSINESS_LIST = "/user/search/merchantSearch";

export const GET_ALL_MERCHANT = "/merchant/getallmerchant";

export const GET_FAITHS = "/comman/getfaiths";

export const GET_HOUSING = "/search/housingSearch";

export const GET_EMPLOYMENT="/employment/jobLists";

export const GET_MERCHANT_BY_ID = "/merchant/listing";

// export const GET_COMMUNITY_BY_ID = "/community/getCommunitybyid";
export const GET_COMMUNITY_BY_ID = "/community/getCommunityDetailbyid";

export const GET_HOUSING_BY_ID = "/search/housingSearch"

export const SEARCH_VALIDATION_MESSAGE = "Keyword is Required";

export const PAGE_SIZE = 10;
