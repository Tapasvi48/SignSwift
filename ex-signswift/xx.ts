// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// export function middleware(request: NextRequest) {
//   const userToken = request.cookies.get("token")?.value;
//   if (!userToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   } else {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }
// export const config = {
//   matcher: "/",
// };

// <div className="hs-dropdown [--placement:top-left] relative inline-flex items-center justify-center">
//   <div
//     id="hs-avatar-group-dropdown"
//     className="hs-dropdown-toggle inline-flex items-center justify-center size-[46px] rounded-full bg-white border-2 border-white font-medium text-gray-700 shadow-sm align-middle hover:bg-gray-300 focus:outline-none focus:bg-blue-100 focus:text-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
//   >
//     {link?.Recipient?.map(
//       (recpientData: any, index: number) =>
//         index >= 2 && (
//           <div className="relative">
//             <div
//               // style={{
//               //   backgroundColor: getRandomColor(),
//               // }}
//               title={recpientData.email}
//               // className="inline-block  size-[32px] rounded-full ring-2 ring-white dark:ring-neutral-900"
//             >
//               {/* <div className="flex items-center justify-center text-white text-xl font-medium m-1">
//       {recpientData.name.charAt(0).toUpperCase()}
//     </div> */}

//               <style jsx>{`
//                 /* Additional styles for the tooltip */
//                 .tooltip {
//                   position: absolute;
//                   bottom: calc(100% + 5px); /* Adjust as needed */
//                   left: 50%;
//                   transform: translateX(-50%);
//                   padding: 5px;
//                   background-color: rgba(0, 0, 0, 0.8);
//                   color: #fff;
//                   font-size: 12px;
//                   border-radius: 3px;
//                   white-space: nowrap;
//                   opacity: 0;
//                   pointer-events: none;
//                   transition: opacity 0.3s ease;
//                 }

//                 .rounded-full:hover .tooltip {
//                   opacity: 1;
//                   pointer-events: auto;
//                 }
//               `}</style>
//             </div>
//           </div>
//         )
//     )}
//     <span className="font-medium leading-none">+</span>
//   </div>
// </div>;
