import React from "react";

const SidebarService = () => {
  return (
    <div className="col-span-1 p-6 bg-white shadow-sm rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Service</h2>
          <ul className="space-y-2 text-sm">
            <li className="p-2 bg-white cursor-pointer"> {" "} Therapy Services {" "} </li>
            <li className="p-2 bg-white cursor-pointer"> {" "} Massage Therapy Services{" "} </li>
            <li className="p-2 bg-white cursor-pointer"> {" "} Relaxation & Care{" "} </li>
          </ul>

          <h2 className="text-lg font-bold mt-4 mb-2">Price Range</h2>
          <div className="flex items-center space-x-2 text-sm">
            <input type="text" className="w-1/2 p-1 border rounded" placeholder="From" />
            <input type="text" className="w-1/2 p-1 border rounded" placeholder="To" />
          </div>
          <button className="mt-2 w-full bg-orange-500 text-white p-2 rounded-md text-sm"> {" "} Apply {" "} </button>

          {/* Cẩm Nang */}
          <h2 className="text-3xl font-bold mt-10 mb-2">Therapy Handbook</h2>
          <div className="space-y-4">
            {[
              { img: "https://media.istockphoto.com/id/1403448976/fr/photo/close-up-esth%C3%A9ticienne-m%C3%A9decin-hand-making-anti-age-proc%C3%A9dure-appliquer-lacide-peeling-jeune.webp?a=1&b=1&s=612x612&w=0&k=20&c=Gbnf9i_6KswytC-4cjuuov73GRJ5IgY3SzFoTqOwTPA=", title: "Skincare Therapy", },
              { img: "https://media.istockphoto.com/id/1962471966/fr/photo/physical-therapist-adjusting-his-male-clients-arm-in-his-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=JCHZYgjaY7eB9M6OjfSo5jXM55GUUTMLe6bUIftho7I=", title: "Therapy Health Care", },
              { img: "https://images.unsplash.com/photo-1728405067645-1288e89241e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHx0aGVyYXB5JTIwbWFzc2FnZXxlbnwwfHwwfHx8MA%3D%3D", title: "Facial Improvement Products ", },
              { img: "https://media.istockphoto.com/id/682884716/fr/photo/massage-de-la-t%C3%AAte.webp?a=1&b=1&s=612x612&w=0&k=20&c=C-t-Xb1TWVoyMZUfVGTSZMqasxIPw4uKG2GXUv9clQ4=", title: "Head Massage Therapy", },
              { img: "https://plus.unsplash.com/premium_photo-1661512156581-13ff34c9c8d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGhlcmFweSUyMFNraW5jYXJlfGVufDB8fDB8fHww", title: "Eye Massage Therapy", },
              { img: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRoZXJhcHklMjBTa2luY2FyZXxlbnwwfHwwfHx8MA%3D%3D", title: "Therapy skin whitening tube", },
              { img: "https://media.istockphoto.com/id/1181405476/fr/photo/femme-faisant-le-service-avec-la-nouvelle-technologie-de-laser-de-la-cosm%C3%A9tologie-mat%C3%A9rielle.webp?a=1&b=1&s=612x612&w=0&k=20&c=pYjHK7T7LEG8RAZf1TJeclO6Oe47_eB3ifJeEOILQMM=", title: "Skin Treatment Therapy", },
              { img: "https://media.istockphoto.com/id/1203733319/fr/photo/recherche-de-drogue-naturelle-extraction-organique-et-scientifique-normale-dans-la-verrerie.webp?a=1&b=1&s=612x612&w=0&k=20&c=tVCUVhZRhG_DnL1kcRBzGdhpd-0_AuOQFru-mlUErI8=", title: "Natural Medicine Therapy", },
            ].map((guide, index) => (
              <div key={index} className="cursor-pointer">
                <hr className="my-4 border-lime-200" />
                <img src={guide.img} alt={`Guide ${index + 1}`} className="w-full h-32 rounded" />
                <span className="block mt-2 bg-white bg-opacity-80 px-2 py-1 rounded text-sm">
                  {guide.title}
                </span>
              </div>
            ))}
          </div>
        </div>
  );
};

export default SidebarService;