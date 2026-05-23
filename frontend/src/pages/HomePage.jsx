import Button from "../components/ui/Button.jsx";
import homeDesign from "../assets/images/home-design.png";
import { Link } from "react-router-dom";

function HeroCard({ title, description, image }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-line h-[280px] md:h-[320px] flex items-center justify-center shadow-sm">
      {/* Background Image */}
      <img src={image} alt="Banner space" className="absolute inset-0 h-full w-full object-cover" />
      
      {/* Mint gradient overlay matching the mockup */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#9ccbc0]/75 to-black/20" />
      
      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3 px-6 py-4 md:px-12 w-full max-w-2xl">
        <h2 className="font-handwritten text-3xl md:text-[42px] text-[#2c4740] font-normal leading-tight whitespace-pre-line">
          {title}
        </h2>
        <p className="font-handwritten text-base md:text-[19px] text-[#3c5950] leading-relaxed max-w-lg whitespace-pre-line pt-1">
          {description}
        </p>
        <Link to="/booking" className="pt-3">
          <button className="bg-[#c5bca8] hover:bg-[#b7af9a] text-white font-bold tracking-widest text-xs md:text-[13px] px-10 py-3.5 rounded-full shadow-md shadow-black/10 transition-all transform hover:scale-105 active:scale-95 uppercase font-sans">
            Đặt bàn ngay
          </button>
        </Link>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="space-y-8 pb-4">
      <HeroCard
        title={"Không gian tinh tế\ncho những phút giây thư giãn"}
        description={"Trải nghiệm ẩm thực trong không gian\nnhẹ nhàng, ấm áp và đầy cảm hứng"}
        image={homeDesign}
      />
      <HeroCard
        title={"Thưởng thức theo cách của bạn"}
        description={"Những món ăn được chuẩn bị với\nsự tinh tế về cảm xúc và hương vị"}
        image={homeDesign}
      />
      <section className="grid gap-6 rounded-2xl border border-line bg-softGray p-8 md:grid-cols-2">
        <div className="space-y-4 flex flex-col justify-center">
          <h3 className="text-3xl font-semibold text-mintDark">Về nhà hàng Chillout</h3>
          <p className="text-gray-600 leading-relaxed">
            Chillout là điểm đến hoàn hảo để bạn thư giãn và thưởng thức ẩm thực. Chúng tôi cam kết
            mang đến những món ăn ngon miệng và đồ uống tinh tế trong không gian ấm cúng.
          </p>
        </div>
        <img src={homeDesign} alt="Không gian Chillout" className="h-[220px] w-full rounded-xl object-cover shadow-sm" />
      </section>
    </div>
  );
}

export default HomePage;
