import axios from "axios";

const API_URL = "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Quiz";

export const fetchActiveQuizzes = async () => {
  try {
    const response = await axios.get(`${API_URL}/active`);
    
    // Thêm ảnh vào mỗi quiz
    return response.data.map((quiz) => ({
      ...quiz,
      imageUrl: getQuizImage(quiz.category) // Gán ảnh dựa trên danh mục
    }));
  } catch (error) {
    console.error("Error fetching active quizzes:", error);
    return [];
  }
};

// Hàm này trả về ảnh tương ứng với từng danh mục
const getQuizImage = (category) => {
  const images = {
    "Skin Type": "https://media.istockphoto.com/id/1979768570/fr/photo/produits-de-beaut%C3%A9-de-la-peau-en-rang%C3%A9e-sur-l%C3%A9tag%C3%A8re-du-salon-de-beaut%C3%A9.webp?a=1&b=1&s=612x612&w=0&k=20&c=PbZfQXOfJX--efChWUhyooZHT71rhZT2bXxTp-q95NI=",
    "Sensitivity": "https://media.istockphoto.com/id/690787172/fr/photo/conteneurs-bouteille-cosm%C3%A9tique-%C3%A0-base-de-plantes-verte-feuilles-%C3%A9tiquette-vierge-pour-la.webp?a=1&b=1&s=612x612&w=0&k=20&c=VV6YxJtlMD5IB0MSFulbxX7JK923mve8GRgXAnvIQn8=",
    "Acne": "https://media.istockphoto.com/id/2094257799/fr/photo/produits-de-soins-du-visage-sur-une-%C3%A9tag%C3%A8re.webp?a=1&b=1&s=612x612&w=0&k=20&c=7bS_lRM_4sWUSDaGRCfsGzlRLuhmnvshkOyazIJIoqc=",
    "Anti-Aging": "https://media.istockphoto.com/id/2132753732/fr/photo/jar-with-body-face-cream-scrub.webp?a=1&b=1&s=612x612&w=0&k=20&c=FtvyRTbAD2EvRfJtp6GgiRvDMUUlfBf5Juztdv14kJU=",
    "Hydration": "https://media.istockphoto.com/id/1203733319/fr/photo/recherche-de-drogue-naturelle-extraction-organique-et-scientifique-normale-dans-la-verrerie.webp?a=1&b=1&s=612x612&w=0&k=20&c=tVCUVhZRhG_DnL1kcRBzGdhpd-0_AuOQFru-mlUErI8="
  };
  return images[category] || "https://example.com/default.jpg"; // Ảnh mặc định nếu không có ảnh cho danh mục
};
