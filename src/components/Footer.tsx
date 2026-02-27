// "use client";

// import { Button } from "@relume_io/relume-ui";
// import React from "react";
// import Image from "next/image";
// import {
//   BiLogoFacebookCircle,
//   BiLogoInstagram,
//   BiLogoLinkedinSquare,
//   BiLogoYoutube,
// } from "react-icons/bi";
// import { RxChevronRight } from "react-icons/rx";
// import { FaXTwitter } from "react-icons/fa6";

// export function Footer() {
//   return (
//     <footer
//       id="relume"
//       className="px-[5%] py-12 md:py-18 lg:py-20 bg-color-paper-1 "
//     >
//       <div>
//         <div className="border-b border-border-primary ">
//           <div className="mb-12 grid grid-cols-1 gap-x-[8vw] gap-y-12 md:mb-18 md:gap-y-16 lg:mb-20 lg:grid-cols-[1fr_0.5fr] lg:gap-y-20">
//             <div className="rb-6 max-w-md">
//               <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-7xl lg:text-10xl">
//                 Explore Our Fashionable Collection Today
//               </h1>
//               <p>
//                 Discover the latest trends in high-end fashion and elevate your
//                 style with our exclusive pieces.
//               </p>
//               <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
//                 <Button
//                   variant="primary"
//                   size="sm"
//                   className="mt-8 flex items-center gap-2 rounded-full px-6 py-4 text-lg font-semibold primary-button shadow-sm transition duration-200 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Shop Now
//                   <RxChevronRight className="h-5 w-5" />
//                 </Button>
//                 <Button
//                   variant="primary"
//                   size="sm"
//                   className="mt-8 flex items-center gap-2 rounded-full px-6 py-4 text-lg font-semibold secondary-button shadow-sm transition duration-200 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Contact Us
//                   <RxChevronRight className="h-5 w-5" />
//                 </Button>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
//               <ul>
//                 <li className="py-2 text-sm font-semibold">
//                   <a href="#">Home</a>
//                 </li>
//                 <li className="py-2 text-sm font-semibold">
//                   <a href="#">About Us</a>
//                 </li>
//                 <li className="py-2 text-sm font-semibold">
//                   <a href="#">Collection 1</a>
//                 </li>
//                 <li className="py-2 text-sm font-semibold">
//                   <a href="#">Collection 2</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="rb-6 col-span-1 flex flex-col items-start justify-between pb-6 sm:flex-row sm:items-center md:pb-8 lg:col-span-2">
//             <a href="#">
//               <Image
//                 src="/logo.png"
//                 alt="Logo image"
//                 width={100}
//                 height={100}
//                 className="mb-6 inline-block sm:mb-0"
//               />
//             </a>
//             {/* <div className="ml-3 flex">
//               <Image
//                 src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
//                 alt="Relume placeholder image"
//                 width={48}
//                 height={48}
//                 className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
//               />
//               <Image
//                 src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
//                 alt="Relume placeholder image"
//                 width={48}
//                 height={48}
//                 className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
//               />
//               <Image
//                 src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
//                 alt="Relume placeholder image"
//                 width={48}
//                 height={48}
//                 className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
//               />
//               <Image
//                 src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
//                 alt="Relume placeholder image"
//                 width={48}
//                 height={48}
//                 className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
//               />
//               <Image
//                 src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
//                 alt="Relume placeholder image"
//                 width={48}
//                 height={48}
//                 className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
//               />
//             </div> */}
//           </div>
//         </div>
//         <div className="flex flex-col-reverse items-start justify-between pt-6 pb-4 text-sm md:flex-row md:items-center md:pt-8 md:pb-0">
//           <p>© 2025 Anuda_Dev. All rights reserved.</p>
//           <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
//             <a href="#">
//               <BiLogoFacebookCircle className="size-6" />
//             </a>
//             <a href="#">
//               <BiLogoInstagram className="size-6" />
//             </a>
//             <a href="#">
//               <FaXTwitter className="size-6 p-0.5" />
//             </a>
//             <a href="#">
//               <BiLogoLinkedinSquare className="size-6" />
//             </a>
//             <a href="#">
//               <BiLogoYoutube className="size-6" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
