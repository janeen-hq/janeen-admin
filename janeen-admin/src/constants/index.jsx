// import { ChartColumn, Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, UserCheck, UserPlus, Users } from "lucide-react";

// import ProfileImage from "@/assets/profile-image.jpg";
// import ProductImage from "@/assets/product-image.jpg";

// export const navbarLinks = [
//     {
//         title: "Dashboard",
//         links: [
//             {
//                 label: "Dashboard",
//                 icon: Home,
//                 path: "/",
//             },
//             {
//                 label: "Analytics",
//                 icon: ChartColumn,
//                 path: "/analytics",
//             },
//             {
//                 label: "Reports",
//                 icon: NotepadText,
//                 path: "/reports",
//             },
//         ],
//     },
//     {
//         title: "Customers",
//         links: [
//             {
//                 label: "Customers",
//                 icon: Users,
//                 path: "/customers",
//             },
//             {
//                 label: "New customer",
//                 icon: UserPlus,
//                 path: "/new-customer",
//             },
//             {
//                 label: "Verified customers",
//                 icon: UserCheck,
//                 path: "/verified-customers",
//             },
//         ],
//     },
//     {
//         title: "Products",
//         links: [
//             {
//                 label: "Products",
//                 icon: Package,
//                 path: "/products",
//             },
//             {
//                 label: "New product",
//                 icon: PackagePlus,
//                 path: "/new-product",
//             },
//             {
//                 label: "Inventory",
//                 icon: ShoppingBag,
//                 path: "/inventory",
//             },
//         ],
//     },
//     {
//         title: "Settings",
//         links: [
//             {
//                 label: "Settings",
//                 icon: Settings,
//                 path: "/settings",
//             },
//         ],
//     },
// ];

import {
  Home,
  FileText,
  Images,
  Languages,
  Users,
  UserCog,
  Medal,
  Trophy,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  ChartPie,
  BarChart3,
  Bell,
  BellPlus,
  Newspaper,
  Settings,
  MessageSquare,
  Baby,
} from "lucide-react";
import ProfileImage from "@/assets/profile-image.jpg";
import ProductImage from "@/assets/product-image.jpg";

export const navbarLinks = [
  {
    title: "Dashboard",
    links: [
      { label: "Dashboard", icon: Home, path: "/" },
      // { label: "Analytics", icon: ChartPie, path: "/analytics" },
      // { label: "Reports", icon: BarChart3, path: "/reports" },
    ],
  },

  {
    title: "Members",
    links: [
      { label: "All Members", icon: Users, path: "/users/members" },
    ],
  },

  {
    title: "Games",
    links: [
      { label: "Game Scores", icon: Trophy, path: "/games/scores" },
    ],
  },

  {
    title: "Notifications",
    links: [
      // `end: true` ensures this link is NOT active when on /notifications/new or /notifications/123/edit
      { label: "Notifications", icon: Bell, path: "/notifications/new", end: true },
      { label: "Create notification", icon: BellPlus, path: "/notifications/create" },
      // optional: direct link to an edit listing or last-opened item
      // { label: "Edit notification", icon: Pencil, path: "/notifications/123/edit" },
    ],
  },
  
   {
    title: "Blogs",
    links: [
      // `end: true` ensures this link is NOT active when on /notifications/new or /notifications/123/edit
      { label: "Blogs", icon: Newspaper, path: "/blogs/blog", end: true },
    //   { label: "Create notification", icon: BellPlus, path: "/notifications/create" },
      // optional: direct link to an edit listing or last-opened item
      // { label: "Edit notification", icon: Pencil, path: "/notifications/123/edit" },
    ],
  },

  {
    title: "CMS",
    links: [
      { label: "Content", icon: FileText, path: "content/contentStage" },
    //   { label: "Media Library", icon: Images, path: "/cms/media" },
    //   { label: "Translations (EN/AR)", icon: Languages, path: "/cms/translations" },
    ],
  },

  // {
  //   title: "Users",
  //   links: [
  //     { label: "All Users", icon: Users, path: "/users/list" },
  //     { label: "Subscriptions", icon: CreditCard, path: "/users/subscriptions" },
  //     { label: "Parent–Child Profiles", icon: UserCog, path: "/users/profiles" },
  //   ],
  // },

  {
    title: "Badges",
    links: [
      { label: "Badge Manager", icon: Medal, path: "/badges/badge" },
    //   { label: "Leaderboards", icon: Trophy, path: "/badges/leaderboards" },
    ],
  },

  {
    title: "Chat",
    links: [
      { label: "Channels", icon: MessageSquare, path: "/chat/channels" },
    ],
  },

  {
    title: "Courses",
    links: [
      { label: "Courses", icon: BookOpen, path: "/courses/list" },
    //   { label: "Exams", icon: ClipboardCheck, path: "/courses/exams" },
    ],
  },

  // {
  //   title: "Payments",
  //   links: [
  //     { label: "Transactions", icon: CreditCard, path: "/payments/transactions" },
  //     { label: "Revenue Reports", icon: BarChart3, path: "/payments/revenue" },
  //   ],
  // },

  // {
  //   title: "Settings",
  //   links: [
  //     { label: "System Settings", icon: Settings, path: "/settings" },
  //   ],
  // },
];

export const overviewData = [
    {
        name: "Jan",
        total: 1500,
    },
    {
        name: "Feb",
        total: 2000,
    },
    {
        name: "Mar",
        total: 1000,
    },
    {
        name: "Apr",
        total: 5000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 5900,
    },
    {
        name: "Jul",
        total: 2000,
    },
    {
        name: "Aug",
        total: 5500,
    },
    {
        name: "Sep",
        total: 2000,
    },
    {
        name: "Oct",
        total: 4000,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2500,
    },
];

export const recentSalesData = [
    {
        id: 1,
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        image: ProfileImage,
        total: 1500,
    },
    {
        id: 2,
        name: "James Smith",
        email: "james.smith@email.com",
        image: ProfileImage,
        total: 2000,
    },
    {
        id: 3,
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        image: ProfileImage,
        total: 4000,
    },
    {
        id: 4,
        name: "Noah Wilson",
        email: "noah.wilson@email.com",
        image: ProfileImage,
        total: 3000,
    },
    {
        id: 5,
        name: "Emma Jones",
        email: "emma.jones@email.com",
        image: ProfileImage,
        total: 2500,
    },
    {
        id: 6,
        name: "William Taylor",
        email: "william.taylor@email.com",
        image: ProfileImage,
        total: 4500,
    },
    {
        id: 7,
        name: "Isabella Johnson",
        email: "isabella.johnson@email.com",
        image: ProfileImage,
        total: 5300,
    },
];

export const topProducts = [
    {
        number: 1,
        name: "Wireless Headphones",
        image: ProductImage,
        description: "High-quality noise-canceling wireless headphones.",
        price: 99.99,
        status: "In Stock",
        rating: 4.5,
    },
    {
        number: 2,
        name: "Smartphone",
        image: ProductImage,
        description: "Latest 5G smartphone with excellent camera features.",
        price: 799.99,
        status: "In Stock",
        rating: 4.7,
    },
    {
        number: 3,
        name: "Gaming Laptop",
        image: ProductImage,
        description: "Powerful gaming laptop with high-end graphics.",
        price: 1299.99,
        status: "In Stock",
        rating: 4.8,
    },
    {
        number: 4,
        name: "Smartwatch",
        image: ProductImage,
        description: "Stylish smartwatch with fitness tracking features.",
        price: 199.99,
        status: "Out of Stock",
        rating: 4.4,
    },
    {
        number: 5,
        name: "Bluetooth Speaker",
        image: ProductImage,
        description: "Portable Bluetooth speaker with deep bass sound.",
        price: 59.99,
        status: "In Stock",
        rating: 4.3,
    },
    {
        number: 6,
        name: "4K Monitor",
        image: ProductImage,
        description: "Ultra HD 4K monitor with stunning color accuracy.",
        price: 399.99,
        status: "In Stock",
        rating: 4.6,
    },
    {
        number: 7,
        name: "Mechanical Keyboard",
        image: ProductImage,
        description: "Mechanical keyboard with customizable RGB lighting.",
        price: 89.99,
        status: "In Stock",
        rating: 4.7,
    },
    {
        number: 8,
        name: "Wireless Mouse",
        image: ProductImage,
        description: "Ergonomic wireless mouse with precision tracking.",
        price: 49.99,
        status: "In Stock",
        rating: 4.5,
    },
    {
        number: 9,
        name: "Action Camera",
        image: ProductImage,
        description: "Waterproof action camera with 4K video recording.",
        price: 249.99,
        status: "In Stock",
        rating: 4.8,
    },
    {
        number: 10,
        name: "External Hard Drive",
        image: ProductImage,
        description: "Portable 2TB external hard drive for data storage.",
        price: 79.99,
        status: "Out of Stock",
        rating: 4.5,
    },
];
