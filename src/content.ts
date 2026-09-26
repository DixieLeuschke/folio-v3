/** Adres z istniejącego portfolio.html. specyfikacja.md go nie podaje. */
export const contactEmail = 'john@pavulon.dev'

export const homeTitle = 'John Pavulon — strony i aplikacje mobilne'

export const navItems = [
  { href: '/#prace', id: 'prace', label: 'Prace' },
  { href: '/#uslugi', id: 'uslugi', label: 'Usługi' },
  { href: '/#proces', id: 'proces', label: 'Proces' },
  { href: '/#o-mnie', id: 'o-mnie', label: 'O mnie' },
  { href: '/#kontakt', id: 'kontakt', label: 'Kontakt' },
] as const

export const cta = {
  href: '/#kontakt',
  label: 'Porozmawiajmy o projekcie',
} as const

export type ProjectStatus = 'Projekt koncepcyjny' | 'Wersja demonstracyjna'

export type CaseBlock = {
  title: string
  paragraphs: string[]
  items?: string[]
}

export type PreviewCanvas = 'phone' | 'wide'

export type ProjectPreview = {
  label: string
  file: string
  description: string
  /** `phone`: klatka ~390×844. `wide`: układ korzysta z szerokiego okna (np. kilka klatek). */
  canvas: PreviewCanvas
}

export type CaseStudy = {
  slug: string
  aliases?: string[]
  placement: 'featured' | 'more'
  title: string
  type: string
  status: ProjectStatus
  summary: string
  thumbnail: string
  thumbnailAlt: string
  thumbnailSecondary?: string
  thumbnailSecondaryAlt?: string
  previews: ProjectPreview[]
  blocks: CaseBlock[]
  tools: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'finlux',
    placement: 'featured',
    title: 'FinLux',
    type: 'Produkt finansowy',
    status: 'Projekt koncepcyjny',
    summary:
      'Ekran aplikacji finansowej, który pokazuje przychody, wydatki i podpowiada, gdzie można oszczędzić.',
    thumbnail: '/thumbnails/finlux.png',
    thumbnailAlt: 'Ekran aplikacji FinLux z podsumowaniem cashflow i insightem AI.',
    previews: [
      {
        label: 'Home · decyzje',
        file: 'finlux-home.html',
        description: 'Rozbudowany ekran główny z mapą wycieków i listą decyzji. Makieta telefonu 390×844.',
        canvas: 'phone',
      },
      {
        label: 'Home · cashflow',
        file: 'finlux-m3.html',
        description: 'Alternatywny wariant ekranu z cashflow i insightem AI. Makieta telefonu 390×844.',
        canvas: 'phone',
      },
    ],
    blocks: [
      {
        title: 'Kontekst',
        paragraphs: [
          'FinLux to studium ekranu głównego produktu finansowego z warstwą insightów AI. Materiały to statyczne makiety HTML. Specyfikacja i pliki nie wskazują klienta ani wdrożenia, więc ich tu nie ma.',
        ],
      },
      {
        title: 'Problem',
        paragraphs: [
          'Lista transakcji nie mówi, czy miesiąc się spina. Ekran ma prowadzić od cashflow netto, przez wyjaśnienie gdzie uciekają pieniądze, do decyzji. Podpowiedź modelu nie może wyglądać jak stan konta.',
        ],
      },
      {
        title: 'Ograniczenia',
        paragraphs: [
          'Klatka telefonu około 390×844 i cele dotykowe od 44 px. Kwoty, persona i procenty na makiecie są przykładowe. Nie są pomiarem tego case study.',
        ],
      },
      {
        title: 'Proces',
        paragraphs: [
          'Kolejność jest zapisana w makiecie ekranu głównego, zanim doszło do stylu.',
        ],
        items: [
          'Sytuacja: cashflow netto, nie feed transakcji.',
          'Wyjaśnienie: osobny blok o tym, gdzie uciekają pieniądze.',
          'Mapa wycieków obok sytuacji, nie zamiast niej.',
          'Decyzje z jednym zbiorczym działaniem na końcu widoku.',
        ],
      },
      {
        title: 'Kluczowe decyzje',
        paragraphs: [
          'Hierarchia oddziela fakt miesiąca od wniosku.',
        ],
        items: [
          'Najpierw wpływy i wydatki, dopiero potem insight.',
          'Mapa wycieków i decyzje są rozdzielone, żeby wniosek nie zlewał się ze stanem.',
          'Jedno działanie zamyka widok, zamiast kilku równorzędnych akcji przy saldzie.',
        ],
      },
      {
        title: 'Prototyp / implementacja',
        paragraphs: [
          'Dwa warianty statycznego ekranu głównego w HTML i CSS: widok cashflow z decyzjami AI oraz wariant home z insightem. Brak logiki aplikacji i brak środowiska produkcyjnego w tych plikach.',
        ],
      },
      {
        title: 'Rezultat',
        paragraphs: [
          'Wniosek jakościowy: czytanie idzie od sytuacji do wyjaśnienia i decyzji. Makieta nie mierzy skutku, więc nie podaję liczb.',
        ],
      },
      {
        title: 'Rola',
        paragraphs: [
          'Hierarchia i układ ekranu głównego. Bez przypisywania wdrożenia albo wyniku biznesowego.',
        ],
      },
    ],
    tools: ['HTML', 'CSS'],
  },
  {
    slug: 'barthmoney',
    placement: 'featured',
    title: 'BarthMoney',
    type: 'Aplikacja mobilna',
    status: 'Wersja demonstracyjna',
    summary:
      'Aplikacja do prowadzenia domowych finansów: podsumowanie, czat i szybkie dodawanie wydatków.',
    thumbnail: '/thumbnails/barthmoney.png',
    thumbnailAlt: 'Trzy widoki aplikacji BarthMoney: pulpit, czat i szybkie dodawanie wydatku.',
    previews: [
      {
        label: 'Interaktywny mockup',
        file: 'barth-money.html',
        description: 'Cztery klatki telefonu obok siebie na szerokim oknie; na wąskim układają się jedna pod drugą.',
        canvas: 'wide',
      },
    ],
    blocks: [
      {
        title: 'Kontekst',
        paragraphs: [
          'BarthMoney to mockup aplikacji prywatnych finansów prowadzonych lokalnie na urządzeniu. Plik składa cztery ekrany: pulpit, czat, szybkie dodanie i pusty stan. Tytuł pliku opisuje go jako mockup po korekcie UX, nie jako wdrożony produkt.',
        ],
      },
      {
        title: 'Problem',
        paragraphs: [
          'Wydatek da się wpisać szybko, ale rozpoznana kwota nie powinna zmieniać salda bez potwierdzenia. Pusty pulpit musi powiedzieć, od czego zacząć. Transakcje i ustawienia są poza tym mockupem.',
        ],
      },
      {
        title: 'Ograniczenia',
        paragraphs: [
          'Mobile-first, cele dotykowe od 44 px, podpis od 12 px. Szybkie dodanie jest opisane jako offline i bez AI. Dane mają zostać na urządzeniu. Pozycje Transakcje i Ustawienia są w nawigacji, ale wyłączone — z adnotacją, że ekran jest poza mockupem. Kwoty na ekranach są przykładowe.',
        ],
      },
      {
        title: 'Proces',
        paragraphs: [
          'Cztery klatki dzielą jeden stan nawigacji.',
        ],
        items: [
          'Pulpit: saldo, przychody i wydatki, wpisy do sprawdzenia, skrót transakcji.',
          'Czat: rozpoznanie wpisu, karta potwierdzenia, błąd braku kwoty, wybór kategorii.',
          'Szybkie dodanie: arkusz z typem transakcji, kwotą i kategorią.',
          'Pusty stan: pierwszy wpis i informacja, że nie ma konta w chmurze.',
        ],
      },
      {
        title: 'Kluczowe decyzje',
        paragraphs: [
          'Pulpit najpierw mówi, ile jest i czy dane zostają na urządzeniu. Zapis wydatku jest osobną decyzją.',
        ],
        items: [
          'Saldo i komunikat o pracy offline są nad historią.',
          'Czat pokazuje kwotę, kategorię, walutę i kurs, a dopiero potem Zatwierdź albo Popraw, z cofnięciem.',
          'Szybkie dodanie jest osobną ścieżką, jawną jako bez AI.',
          'Ekrany spoza zakresu zostają widoczne, ale nieaktywne — mockup nie udaje pełnej aplikacji.',
        ],
      },
      {
        title: 'Prototyp / implementacja',
        paragraphs: [
          'Interaktywny HTML, CSS i JavaScript: wspólna nawigacja, arkusz, klawiatura kwoty, zatwierdzenie, cofnięcie i komunikat, gdy parser nie znajduje kwoty.',
        ],
      },
      {
        title: 'Rezultat',
        paragraphs: [
          'Wniosek jakościowy: ścieżka pulpitu, czatu, szybkiego dodania i pustego stanu jest w jednym mockupie, a braki zakresu są oznaczone. Plik nie zawiera danych o wdrożeniu ani o użyciu.',
        ],
      },
      {
        title: 'Rola',
        paragraphs: [
          'UX i UI mockupu: hierarchia pulpitu, potwierdzenie wpisu i stany brzegowe.',
        ],
      },
    ],
    tools: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    slug: 'graff',
    aliases: ['suplementacja'],
    placement: 'more',
    title: 'Graff',
    type: 'Aplikacja mobilna',
    status: 'Wersja demonstracyjna',
    summary:
      'Kalendarz zmian i dzienny plan dawek w jednym produkcie: dniówki, nocki, godziny oraz co przyjąć i kiedy.',
    thumbnail: '/thumbnails/graff.png',
    thumbnailAlt: 'Mobilny kalendarz Graff z oznaczonymi zmianami dziennymi i nocnymi.',
    thumbnailSecondary: '/thumbnails/suplementacja.png',
    thumbnailSecondaryAlt: 'Ekran suplementacji Graff z wynikiem dnia i listą zaplanowanych dawek.',
    previews: [
      {
        label: 'Kalendarz zmian',
        file: 'GRAFF.html',
        description: 'Interaktywny kalendarz z wyborem zmian, nawigacją po miesiącach i automatycznym podsumowaniem. Makieta telefonu 390×844.',
        canvas: 'phone',
      },
      {
        label: 'Plan dawek',
        file: 'suplementacja.html',
        description: 'Dzienny plan suplementów z wynikiem dnia, dawkami i komunikatami. Makieta telefonu 390×844.',
        canvas: 'phone',
      },
    ],
    blocks: [
      {
        title: 'Kontekst',
        paragraphs: [
          'Graff to mobilny prototyp kalendarza pracy zmianowej. Drugi ekran dokłada codzienny plan dawek: postęp dnia oraz dawki wykonane, pominięte i zaplanowane.',
        ],
      },
      {
        title: 'Problem',
        paragraphs: [
          'Grafik ma pozwolić rozpoznać rodzaj zmiany, sprawdzić godziny i poprawić dzień bez osobnego formularza. Lista suplementów ma od razu odpowiadać: co przyjąć, kiedy i co już zrobione.',
        ],
      },
      {
        title: 'Kluczowe decyzje',
        paragraphs: ['Kalendarz jest widokiem i edycją. Plan dawek trzyma wynik dnia nad listą.'],
        items: [
          'Dniówki i nocki mają osobne oznaczenia, a statystyki miesiąca liczą się przy zmianie dnia.',
          'Wybranie dnia otwiera szczegóły bez opuszczania miesiąca.',
          'Spóźniona dawka ma komunikat, nie tylko zmianę koloru.',
          'Przypomnienia i dodanie suplementu są osobnymi działaniami.',
        ],
      },
      {
        title: 'Prototyp / implementacja',
        paragraphs: [
          'Dwa interaktywne widoki HTML, CSS i JavaScript: kalendarz zmian oraz dzienny plan dawek z aktualizacją postępu.',
        ],
      },
      {
        title: 'Rola',
        paragraphs: ['UX i UI obu ekranów oraz stany brzegowe planu dawek.'],
      },
    ],
    tools: ['HTML', 'CSS', 'JavaScript'],
  },
]

export function caseBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug || item.aliases?.includes(slug))
}

export const featuredWork = caseStudies.filter((item) => item.placement === 'featured')
export const furtherWork = caseStudies.filter((item) => item.placement === 'more')

export const services = [
  {
    title: 'Product i UX',
    text: 'Problem, architektura informacji i przepływ użytkownika, zanim powstanie ekran.',
  },
  {
    title: 'UI i system wizualny',
    text: 'Typografia, tokeny, stany i hierarchia, które da się utrzymać w kodzie.',
  },
  {
    title: 'Front-end',
    text: 'Działający interfejs w HTML, CSS, React i TypeScript — od prototypu do strony.',
  },
] as const

export const processSteps = [
  { title: 'Poznaję cel', text: 'Ustalam, czego potrzebujesz i dla kogo powstaje projekt.' },
  { title: 'Układam rozwiązanie', text: 'Porządkuję treść i planuję najważniejsze ekrany.' },
  { title: 'Projektuję wygląd', text: 'Dobieram styl, kolory i sposób obsługi.' },
  { title: 'Uruchamiam i poprawiam', text: 'Przygotowuję działającą wersję i dopracowuję szczegóły.' },
] as const

export const aboutPrinciples =
  'Ekran ma prowadzić do konkretnej decyzji. Kolor i typografia służą hierarchii, a ten sam układ ma działać na telefonie i na pulpicie.'

export const projectKinds = [
  'Strona internetowa',
  'Aplikacja mobilna',
  'Projekt interfejsu',
  'Poprawa istniejącej strony lub aplikacji',
] as const
