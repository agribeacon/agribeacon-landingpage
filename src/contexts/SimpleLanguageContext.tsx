import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'vi' | 'ja';

interface SimpleLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const SimpleLanguageContext = createContext<SimpleLanguageContextType | undefined>(undefined);

// Simple translations for Home page only
const translations = {
  en: {
    'home.hero.badge': 'Precision Agriculture Technology',
    'home.hero.title1': 'Precise signals.',
    'home.hero.title2': 'Smarter sensing.',
    'home.hero.title3': 'Sustainable growth.',
    'home.hero.subtitle': 'Transform your farm with intelligent, end-to-end agricultural technology solutions. Optimize every decision from soil to harvest.',
    'home.hero.explore': 'Explore Solutions',
    'home.hero.demo': 'Request Demo',
    
    'home.vision.title': 'Our Vision',
    'home.vision.subtitle': 'To become the world\'s leading provider of intelligent, end-to-end agricultural technology solutions for perennial plant farms — enabling them to thrive economically, ecologically, and socially.',
    'home.mission.title': 'Our Mission',
    'home.mission.text1': 'We empower farmers and agricultural businesses through a unified ecosystem of hardware and software — including autonomous drones, robotics, IoT sensors, and AI-powered analytics — to optimize every decision from soil to harvest.',
    'home.mission.text2': 'Our mission is to transform agriculture through precision, automation, and insight, delivering measurable impact to both people and planet.',
    'home.stats.farms': 'Farms Optimized',
    'home.stats.data': 'Data Points Daily',
    'home.stats.yield': 'Yield Increase',
    'home.stats.water': 'Water Saved',
    
    'home.solutions.title': 'Intelligent Solutions',
    'home.solutions.subtitle': 'A complete ecosystem of cutting-edge agricultural technology',
    'home.solutions.autonomous': 'Autonomous Drones',
    'home.solutions.autonomous.desc': 'Intelligent aerial monitoring and data collection',
    'home.solutions.robotics': 'Smart Robotics',
    'home.solutions.robotics.desc': 'Automated farming operations and precision tasks',
    'home.solutions.iot': 'IoT Sensors',
    'home.solutions.iot.desc': 'Real-time environmental monitoring and alerts',
    'home.solutions.ai': 'AI Analytics',
    'home.solutions.ai.desc': 'Data-driven insights for optimal decision making',
    'home.solutions.viewAll': 'View All Solutions',
    
    'home.cta.title': 'Ready to Transform Your Farm?',
    'home.cta.subtitle': 'Join hundreds of forward-thinking farms using AgriBeacon to increase yields, reduce waste, and build a sustainable future.',
    'home.cta.demo': 'Schedule a Demo',
    'home.cta.learn': 'Learn More',
    
    // Navigation
    'nav.technology': 'Technology',
    'nav.resources': 'Resources',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact Us',
    'nav.login': 'Login',
    'nav.tryForFree': 'Try for FREE',
    'nav.contactSales': 'Contact Sales',
    
    // Technology menu
    'nav.technology.platform': 'Platform Overview',
    'nav.technology.ai': 'AI Analytics',
    'nav.technology.connectivity': 'Connectivity',
    'nav.technology.all': 'All Technology',
    
    // Resources menu
    'nav.resources.bestPractices': 'Best Practices',
    
    // About menu
    'nav.about.aboutUs': 'About Us',
    'nav.about.careers': 'Careers',
    'nav.about.contact': 'Contact',
    
    // Footer
    'footer.company': 'Company',
    'footer.solutions': 'Solutions',
    'footer.technology': 'Technology',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2024 AgriBeacon. All rights reserved.',
  },
  vi: {
    'home.hero.badge': 'Công nghệ nông nghiệp chính xác',
    'home.hero.title1': 'Tín hiệu chính xác.',
    'home.hero.title2': 'Cảm biến thông minh.',
    'home.hero.title3': 'Tăng trưởng bền vững.',
    'home.hero.subtitle': 'Chuyển đổi trang trại của bạn với các giải pháp công nghệ nông nghiệp thông minh, toàn diện. Tối ưu hóa mọi quyết định từ đất đến thu hoạch.',
    'home.hero.explore': 'Khám phá giải pháp',
    'home.hero.demo': 'Yêu cầu demo',
    
    'home.vision.title': 'Tầm nhìn của chúng tôi',
    'home.vision.subtitle': 'Trở thành nhà cung cấp hàng đầu thế giới về các giải pháp công nghệ nông nghiệp thông minh, toàn diện cho các trang trại cây lâu năm — giúp họ phát triển mạnh về kinh tế, sinh thái và xã hội.',
    'home.mission.title': 'Sứ mệnh của chúng tôi',
    'home.mission.text1': 'Chúng tôi trao quyền cho nông dân và doanh nghiệp nông nghiệp thông qua hệ sinh thái thống nhất của phần cứng và phần mềm — bao gồm máy bay không người lái tự động, robot, cảm biến IoT và phân tích AI — để tối ưu hóa mọi quyết định từ đất đến thu hoạch.',
    'home.mission.text2': 'Sứ mệnh của chúng tôi là chuyển đổi nông nghiệp thông qua độ chính xác, tự động hóa và thông tin chi tiết, mang lại tác động có thể đo lường được cho cả con người và hành tinh.',
    'home.stats.farms': 'Trang trại được tối ưu',
    'home.stats.data': 'Điểm dữ liệu hàng ngày',
    'home.stats.yield': 'Tăng năng suất',
    'home.stats.water': 'Tiết kiệm nước',
    
    'home.solutions.title': 'Giải pháp thông minh',
    'home.solutions.subtitle': 'Hệ sinh thái hoàn chỉnh của công nghệ nông nghiệp tiên tiến',
    'home.solutions.autonomous': 'Máy bay không người lái tự động',
    'home.solutions.autonomous.desc': 'Giám sát trên không thông minh và thu thập dữ liệu',
    'home.solutions.robotics': 'Robot thông minh',
    'home.solutions.robotics.desc': 'Hoạt động nông nghiệp tự động và nhiệm vụ chính xác',
    'home.solutions.iot': 'Cảm biến IoT',
    'home.solutions.iot.desc': 'Giám sát môi trường thời gian thực và cảnh báo',
    'home.solutions.ai': 'Phân tích AI',
    'home.solutions.ai.desc': 'Thông tin chi tiết dựa trên dữ liệu để ra quyết định tối ưu',
    'home.solutions.viewAll': 'Xem tất cả giải pháp',
    
    'home.cta.title': 'Sẵn sàng chuyển đổi trang trại của bạn?',
    'home.cta.subtitle': 'Tham gia cùng hàng trăm trang trại có tầm nhìn xa sử dụng AgriBeacon để tăng năng suất, giảm lãng phí và xây dựng tương lai bền vững.',
    'home.cta.demo': 'Đặt lịch demo',
    'home.cta.learn': 'Tìm hiểu thêm',
    
    // Navigation
    'nav.technology': 'Công nghệ',
    'nav.resources': 'Tài nguyên',
    'nav.pricing': 'Bảng giá',
    'nav.about': 'Giới thiệu',
    'nav.contact': 'Liên hệ',
    'nav.login': 'Đăng nhập',
    'nav.tryForFree': 'Dùng thử MIỄN PHÍ',
    'nav.contactSales': 'Liên hệ bán hàng',
    
    // Technology menu
    'nav.technology.platform': 'Tổng quan nền tảng',
    'nav.technology.ai': 'Phân tích AI',
    'nav.technology.connectivity': 'Kết nối',
    'nav.technology.all': 'Tất cả công nghệ',
    
    // Resources menu
    'nav.resources.bestPractices': 'Thực hành tốt nhất',
    
    // About menu
    'nav.about.aboutUs': 'Về chúng tôi',
    'nav.about.careers': 'Tuyển dụng',
    'nav.about.contact': 'Liên hệ',
    
    // Footer
    'footer.company': 'Công ty',
    'footer.solutions': 'Giải pháp',
    'footer.technology': 'Công nghệ',
    'footer.resources': 'Tài nguyên',
    'footer.legal': 'Pháp lý',
    'footer.copyright': '© 2024 AgriBeacon. Tất cả quyền được bảo lưu.',
  },
  ja: {
    'home.hero.badge': '精密農業テクノロジー',
    'home.hero.title1': '精密な信号。',
    'home.hero.title2': 'スマートセンシング。',
    'home.hero.title3': '持続可能な成長。',
    'home.hero.subtitle': 'インテリジェントなエンドツーエンドの農業技術ソリューションで農場を変革。土壌から収穫まで、すべての決定を最適化。',
    'home.hero.explore': 'ソリューションを探索',
    'home.hero.demo': 'デモをリクエスト',
    
    'home.vision.title': '私たちのビジョン',
    'home.vision.subtitle': '多年生植物農場向けのインテリジェントでエンドツーエンドの農業技術ソリューションの世界有数のプロバイダーになること — 経済的、生態学的、社会的に繁栄できるようにします。',
    'home.mission.title': '私たちのミッション',
    'home.mission.text1': '自律ドローン、ロボティクス、IoTセンサー、AI搭載分析を含むハードウェアとソフトウェアの統合エコシステムを通じて、農家と農業ビジネスに力を与え、土壌から収穫までのすべての決定を最適化します。',
    'home.mission.text2': '私たちのミッションは、精密性、自動化、洞察を通じて農業を変革し、人々と地球の両方に測定可能なインパクトをもたらすことです。',
    'home.stats.farms': '最適化された農場',
    'home.stats.data': '日次データポイント',
    'home.stats.yield': '収量増加',
    'home.stats.water': '節水',
    
    'home.solutions.title': 'インテリジェントソリューション',
    'home.solutions.subtitle': '最先端の農業技術の完全なエコシステム',
    'home.solutions.autonomous': '自律ドローン',
    'home.solutions.autonomous.desc': 'インテリジェントな空中監視とデータ収集',
    'home.solutions.robotics': 'スマートロボティクス',
    'home.solutions.robotics.desc': '自動化された農業オペレーションと精密タスク',
    'home.solutions.iot': 'IoTセンサー',
    'home.solutions.iot.desc': 'リアルタイム環境監視とアラート',
    'home.solutions.ai': 'AI分析',
    'home.solutions.ai.desc': '最適な意思決定のためのデータ駆動型洞察',
    'home.solutions.viewAll': 'すべてのソリューションを見る',
    
    'home.cta.title': '農場を変革する準備はできていますか？',
    'home.cta.subtitle': '収量を増加し、廃棄物を削減し、持続可能な未来を築くためにAgriBeaconを使用している数百の先見性のある農場に参加してください。',
    'home.cta.demo': 'デモをスケジュール',
    'home.cta.learn': '詳細を見る',
    
    // Navigation
    'nav.technology': 'テクノロジー',
    'nav.resources': 'リソース',
    'nav.pricing': '料金',
    'nav.about': '会社概要',
    'nav.contact': 'お問い合わせ',
    'nav.login': 'ログイン',
    'nav.tryForFree': '無料で試す',
    'nav.contactSales': '営業に問い合わせ',
    
    // Technology menu
    'nav.technology.platform': 'プラットフォーム概要',
    'nav.technology.ai': 'AI分析',
    'nav.technology.connectivity': '接続性',
    'nav.technology.all': 'すべてのテクノロジー',
    
    // Resources menu
    'nav.resources.bestPractices': 'ベストプラクティス',
    
    // About menu
    'nav.about.aboutUs': '会社について',
    'nav.about.careers': '採用情報',
    'nav.about.contact': 'お問い合わせ',
    
    // Footer
    'footer.company': '会社',
    'footer.solutions': 'ソリューション',
    'footer.technology': 'テクノロジー',
    'footer.resources': 'リソース',
    'footer.legal': '法的',
    'footer.copyright': '© 2024 AgriBeacon. 全著作権所有。',
  },
};

export const SimpleLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'vi', 'ja'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <SimpleLanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </SimpleLanguageContext.Provider>
  );
};

export const useSimpleLanguage = () => {
  const context = useContext(SimpleLanguageContext);
  if (context === undefined) {
    throw new Error('useSimpleLanguage must be used within a SimpleLanguageProvider');
  }
  return context;
};
