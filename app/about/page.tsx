import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">ShoeStore-ийн тухай</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            2010 оноос хойш чанартай гутал нийлүүлж байна
          </p>
        </div>
        
        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Бидний түүх</h2>
            <p className="text-gray-600 mb-4">
              2010 онд үүсгэн байгуулагдсан ShoeStore нь энгийн зорилготой байсан: хүртээмжтэй үнээр өндөр чанартай, загварлаг гутал нийлүүлэх. Нью-Йоркийн жижиг дэлгүүрээс эхэлсэн бизнес маань дэлхий даяар хэрэглэгчдийн итгэлийг хүлээсэн дэлхийн брэнд болон өргөжсөн.
            </p>
            <p className="text-gray-600 mb-4">
              Манай үүсгэн байгуулагч Жэйн Смит нь тав тухтай, удаан эдэлгээтэй, орчин үеийн дизайнтай гутлын зах зээлийн хоосон орон зайг олж харсан. Загварын салбарт олж авсан туршлагадаа тулгуурлан тэрээр онцгой гутал бүтээхэд чин сэтгэлээсээ ханддаг дизайнерууд, урчуудын баг бүрдүүлсэн.
            </p>
            <p className="text-gray-600">
              Өнөөдөр ShoeStore нь спортоос эхлээд өдөр тутмын загварлаг гутал хүртэл бүх төрлийн гутлын олон төрлийг санал болгодог. Бид чанар, загвар, хэрэглэгчийн сэтгэл ханамжийн үндсэн үнэт зүйлсээ хадгалсаар шинэчлэлт хийж, цуглуулгаа өргөжүүлсээр байна.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/company-history.jpg"
              alt="ShoeStore company history"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Бидний үнэт зүйлс</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">Ч</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Чанар</h3>
              <p className="text-gray-600">
                Бид хамгийн сайн материалыг олж, ур чадвартай урчуудтай хамтран сайхан харагдаж, удаан эдэлгээтэй гутал үйлдвэрлэдэг.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">Ш</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Шинэчлэл</h3>
              <p className="text-gray-600">
                Бид тав тухтай байдал, гүйцэтгэлийг сайжруулахын тулд шинэ загвар, материал, технологийг байнга судалдаг.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">Т</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Тогтвортой байдал</h3>
              <p className="text-gray-600">
                Бид хариуцлагатай эх үүсвэр, байгаль орчинд ээлтэй практикаар дамжуулан байгаль орчинд үзүүлэх нөлөөллөө бууруулахыг зорьж байна.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Бидний баг</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Жэйн Смит', role: 'Үүсгэн байгуулагч & Гүйцэтгэх захирал' },
              { name: 'Майкл Жонсон', role: 'Дизайны хэлтсийн дарга' },
              { name: 'Сара Вильямс', role: 'Маркетингийн захирал' },
              { name: 'Дэвид Чен', role: 'Үйл ажиллагааны менежер' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 rounded-full w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                  <p className="text-gray-500">Зураг</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}