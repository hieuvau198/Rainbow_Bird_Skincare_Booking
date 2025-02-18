import React from "react";

export default function SkincareCategories() {
  const categories = [
    {
      title: "Skin Brightening",
      items: [
        { name: "Nano Brightening Treatment", price: "$50.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnwPnn4prFynRB8KTZAlOn91Vy0CRphQ3ihg&s" },
        { name: "Vitamin C Brightening Essence", price: "$30.00", image: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-qr8ozl131mjv2c" },
        { name: "Collagen Brightening", price: "$45.00", image: "https://shijang.com/public/documents/product/148/1481655024184_6b9e3eba58c641e15d0d.jpg" }
      ]
    },
    {
      title: "Acne Removal",
      items: [
        { name: "Deep Acne Treatment", price: "$60.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5HULFwMfPh7oL4hZEZx-3WXfnK9uEWaX-cA&s" },
        { name: "Blue Light Therapy", price: "$40.00", image: "https://images.squarespace-cdn.com/content/v1/55b167e3e4b02d875c748259/1569471499777-Z3GTZH9NYKEIGW9UJMMX/MediLUX-Treatment-Blue-Light-01-1920x1280.jpg" },
        { name: "Instant Acne Reduction Products", price: "$25.00", image: "https://assets.vogue.com/photos/65f474597db3eabf5a5b1dcc/3:2/w_1332,h_888,c_limit/versed%20(1).jpg" }
      ]
    },
    {
      title: "Skin Rejuvenation",
      items: [
        { name: "Laser Rejuvenation Treatment", price: "$70.00", image: "https://curvz.com.au/wp-content/uploads/2023/09/DSC05427-1-scaled-e1698745613523.jpg" },
        { name: "Collagen Skin Rejuvenation", price: "$50.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJSo40NhkamhkiWQ91_w6gpC3HZGnv8Ya8iA&s" },
        { name: "Lifting Mask", price: "$35.00", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSznUpqnbYS5MBB1KmdxqUmjEVVfdb7rIzHA&s" }
      ]
    }
  ];

  return (
   <div className="p-4 max-w-7xl mx-auto bg-transparent">
     <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Elevate Your Beauty Ritual</h1>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       {categories.map((category, index) => (
         <div key={index}>
           <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">{category.title}</h2>
           <div className="space-y-6">
             {category.items.map((item, idx) => (
               <div key={idx} className="flex items-center space-x-4">
                 <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                 <div>
                   <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                   <p className="text-gray-500">{item.price}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}