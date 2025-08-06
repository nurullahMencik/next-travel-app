#  Travel App

TaskAPP Travel App, kullanıcıların dünya genelindeki otelleri keşfetmelerine, detaylı filtreleme seçenekleriyle aramalarını daraltmalarına ve aradıkları konaklama birimlerini kolayca görüntülemelerine olanak tanıyan modern ve yüksek performanslı bir web uygulamasıdır. Next.js'in App Router mimarisi sayesinde, hızlı yükleme süreleri ve üst düzey SEO uyumluluğu ile kesintisiz bir kullanıcı deneyimi sunarız.

## Canlı adres 
Projenin çalışan halini incelemek için aşağıdaki linki ziyaret edebilirsiniz:

Canlı Site: https://taskapp-next-yeni.vercel.app


## Özellikler

* **Detaylı Otel Arama:** Konum, tarih ve kişi sayısına göre otel arama imkanı.
* **Kapsamlı Filtreleme Sistemi:** Fiyat aralığı, yıldız sayısı, puanlama, olanaklar ve daha fazlasına göre arama sonuçlarını daraltma.
* **Güvenli Kullanıcı Kimlik Doğrulaması:** JWT (JSON Web Tokens) ve NextAuth.js entegrasyonu ile güvenli kayıt ve giriş sistemi.
* **Kullanıcı Profili Yönetimi:** Kullanıcıların kişisel bilgilerini görüntülemesi.
* **Responsive Tasarım:** Tailwind CSS ile geliştirilmiş, tüm cihazlarda (masaüstü, tablet, mobil) kusursuz bir deneyim sunar.
* **SEO Dostu Sayfalar:** Next.js'in sunucu tarafı renderlama (SSR) yetenekleri sayesinde arama motorları için optimize edilmiş içerik.
* **Merkezi Durum Yönetimi:** Otel verileri, filtre seçenekleri ve diğer uygulama durumu, global olarak [Zustand] kullanılarak yönetilir.

## Teknolojiler

Bu projenin temelinde aşağıdaki modern teknolojiler ve kütüphaneler yer almaktadır:

### Frontend

* **React / Next.js (App Router):** Hızlı, etkileşimli ve SEO dostu kullanıcı arayüzleri oluşturmak için güçlü bir kombinasyon.
* **Tailwind CSS:** Utility-first prensibiyle hızlı ve duyarlı UI geliştirmeye olanak tanıyan bir CSS çatısı.
* **Axios:** Backend API ile kolay ve vaat tabanlı HTTP istekleri yapmak için popüler bir istemci.
* **Next.js Router:** Performanslı ve sezgisel sayfa yönlendirmesi için.
* **React Hooks (useState, useEffect vb.):** Bileşenlerin durum yönetimi, yan etkiler ve yaşam döngüsü metodları için.
* **Shadcn/ui:** Erişilebilir ve özelleştirilebilir UI bileşenleri kütüphanesi.
* **Zustand:** Hafif, esnek ve hızlı bir durum yönetimi kütüphanesi.

### Backend

* **Node.js:** Sunucu tarafı uygulamaları ve API'ler geliştirmek için bir JavaScript çalışma zamanı ortamı.
* **Express.js:** Node.js üzerinde RESTful API'ler ve web uygulamaları oluşturmak için minimalist ve esnek bir web framework'ü.
* **MongoDB:** Büyük ölçekli, esnek ve yüksek performanslı NoSQL veritabanı çözümü.
* **Mongoose:** MongoDB ile Node.js arasında kolay etkileşim sağlayan güçlü bir Object Data Modeling (ODM) kütüphanesi.
* **JWT (JSON Web Tokens):** Kullanıcı kimlik doğrulama ve yetkilendirme süreçlerinde güvenliği sağlayan standart bir yöntem.
* **bcrypt.js:** Kullanıcı şifrelerinin güvenli bir şekilde hashlenmesi için.
* **dotenv:** Ortam değişkenlerinin projenizde kolayca yönetilmesi için.
* **express-async-handler:** Asenkron Express rotalarında hata yönetimini basitleştirmek ve boilerplate kodu azaltmak için.
* **Prisma ORM:** Veritabanı ile etkileşimi kolaylaştıran modern bir Object-Relational Mapping (ORM) aracı.

## Mimari ve Proje Dizini

Proje, hem ön uç hem de arka uç işlevselliğini tek bir çatı altında birleştiren, modüler ve anlaşılır bir yapıya sahiptir. Next.js'in App Router yapısı, hem istemci hem de sunucu tarafı bileşenleri verimli bir şekilde yönetmemizi sağlar.
````
├── app/                      # Next.js App Router uygulamasının ana dizini
│   ├── (auth)/               # Kimlik doğrulama ile ilgili sayfaları gruplayan klasör
│   │   ├── login/            #   - Kullanıcı giriş sayfası
│   │   │   └── page.tsx      #
│   │   └── register/         #   - Yeni kullanıcı kayıt sayfası
│   │       └── page.tsx      #
│   ├── (routes)/             # Uygulamanın ana rotalarını gruplayan klasör
│   │   ├── (home)/           #   - Ana sayfa (kök rota)
│   │   │   └── page.tsx      #     - Ana sayfa bileşeni (URL: /)
│   │   ├── about/            #   - Hakkımızda sayfası
│   │   │   └── page.tsx      #
│   │   ├── contact/          #   - İletişim sayfası
│   │   │   └── page.tsx      #
│   │   ├── hotels/           #   - Otel listeleme ve detay sayfaları
│   │   │   ├── page.tsx      #   - Otel listeleme sayfası
│   │   │   └── [id]/page.tsx #   - Dinamik otel detay sayfası (ID'ye göre)
│   │   ├── profile/          #   - Kullanıcı profil sayfası
│   │   │   └── page.tsx      #
│   │   ├── rent-a-cars/      #   - Araç kiralama ile ilgili sayfalar
│   │   │   ├── page.tsx      #   - Ana araç kiralama sayfası
│   │   │   └── _components/  #     - Araç kiralama filtreleri ve listeleme bileşenleri
│   │   ├── search/           #   - Genel arama sonuçları sayfası
│   │   │   ├── page.tsx      #   - Arama sonuçlarını gösteren sayfa
│   │   │   └── _components/  #     - Arama sonuçları için alt bileşenler
│   │   └── trips/            #   - Seyahat listeleme ve filtreleme ile ilgili sayfalar
│   │       ├── page.tsx      #   - Ana seyahatler listeleme sayfası
│   │       └── _components/  #     - Seyahat listesi ve filtreleme bileşenleri
│   ├── api/                  # Next.js API rotalarının bulunduğu dizin (sunucu tarafı işlemler)
│   │   ├── auth/             #   - Kimlik doğrulama API rotaları
│   │   │   └── [...nextauth]/route.ts #   - NextAuth.js için dinamik kimlik doğrulama API rotası
│   │   ├── contact/route.ts  #   - İletişim formu gönderimi için API rotası
│   │   └── hotels/route.ts   #   - Otel verilerini sağlayan API rotası
│   ├── favicon.ico           # Site ikonu (tarayıcı sekmesinde görünür)
│   ├── globals.css           # Uygulamanın global CSS stilleri (Tailwind CSS importları burada olabilir)
│   └── layout.tsx            # Uygulamanın ana düzen (layout) dosyası (tüm sayfalarda ortak UI)
├── components/               # Uygulama genelinde yeniden kullanılabilir UI bileşenleri
│   ├── ui/                   #   - shadcn/ui gibi kütüphanelerden gelen temel UI bileşenleri (Button, Input vb.)
│   ├── sections/             #   - Büyük sayfa bölümleri (Header, Footer, RecentProduct, Hero, MainSearch vb.)
│   └── ...                   #   - Diğer özel bileşenler
├── constans/                 # Uygulama genelinde kullanılan sabitler ve veriler (navigasyon, slider verileri)
│   └── index.ts              #
├── lib/                      # Yardımcı kütüphaneler ve util fonksiyonları
│   └── db.ts                 #   - Prisma veritabanı istemcisi yapılandırması
├── node_modules/             # Proje bağımlılıklarının bulunduğu dizin (npm/yarn tarafından yönetilir)
├── prisma/                   # Prisma ORM'in veritabanı şeması ve konfigürasyonu
│   ├── schema.prisma         #   - Veritabanı modeli şeması (tablolar ve ilişkiler)
│   └── seed.js               #   - Veritabanına başlangıç verilerini yükleme scripti
├── public/                   # Statik varlıkların (resimler, fontlar vb.) bulunduğu dizin
│   ├── favicon.ico           #   - Site ikonu (yedek veya eski kullanım için)
│   ├── home/                 #   - Ana sayfada kullanılan görseller (1.jpg, 2.jpg vb.)
│   ├── slider/               #   - Slider bileşeninde kullanılan görseller (Argentina.png, France.png vb.)
│   ├── swipper/              #   - Swiper bileşeninde kullanılan görseller (1.png, 2.png vb.)
│   └── ...                   #   - Diğer statik varlıklar (otel görselleri vb.)
├── types/                    # Özel TypeScript tür tanımları (interface, type alias)
├── zustands/                 # Zustand durum yönetimi store'ları
│   └── hotelStore.ts         #   - Otel verilerini ve filtreleme state'ini yöneten Zustand store
├── .env                      # Ortam değişkenleri (yerel geliştirme için)
├── .gitignore                # Git versiyon kontrolü için göz ardı edilecek dosyalar
├── components.json           # Shadcn/ui bileşen yapılandırma dosyası
├── eslint.config.mjs         # ESLint kod kalitesi denetleyicisi yapılandırma dosyası
├── next-auth.d.ts            # NextAuth.js için TypeScript tanım dosyası
├── next.config.ts            # Next.js yapılandırma dosyası
├── package-lock.json         # npm bağımlılık kilit dosyası
├── package.json              # Proje bağımlılıkları ve scriptleri
├── postcss.config.mjs        # PostCSS yapılandırma dosyası (Tailwind CSS için)
├── README.md                 # Proje hakkında genel bilgi içeren bu dosya
└── tsconfig.json             # TypeScript derleyici yapılandırma dosyası````


## Geliştirici
Bu projenin geliştirilmesi  Nurullah Mencik tarafından yapılmıştır

GitHub: https://github.com/nurullahMencik

LinkedIn: https://www.linkedin.com/in/nurullah-mencik-6b692a216

Kişisel Web Sitesi/Portfolyo: http://konyaereglisatis.com/portfolio