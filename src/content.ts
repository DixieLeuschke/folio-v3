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

export type ProjectPreview = {
  label: string
  file: string
  description: string
}

export type CaseStudy = {
  slug: string
  title: string
  type: string
  status: ProjectStatus
  summary: string
  thumbnail: string
  thumbnailAlt: string
  previews: ProjectPreview[]
  blocks: CaseBlock[]
  tools: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'finlux',
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
        description: 'Rozbudowany ekran główny z mapą wycieków i listą decyzji.',
      },
      {
        label: 'Home · cashflow',
        file: 'finlux-m3.html',
        description: 'Alternatywny wariant ekranu z cashflow i insightem AI.',
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
        description: 'Cztery ekrany aplikacji z działającą nawigacją, formularzami i stanami.',
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
    title: 'Graff',
    type: 'Aplikacja mobilna',
    status: 'Wersja demonstracyjna',
    summary:
      'Kalendarz pracy z dniówkami, nockami, podsumowaniem godzin i szczegółami każdego dnia.',
    thumbnail: '/thumbnails/graff.png',
    thumbnailAlt: 'Mobilny kalendarz Graff z oznaczonymi zmianami dziennymi i nocnymi.',
    previews: [
      {
        label: 'Kalendarz zmian',
        file: 'GRAFF.html',
        description: 'Interaktywny kalendarz z wyborem zmian, nawigacją po miesiącach i automatycznym podsumowaniem.',
      },
    ],
    blocks: [
      {
        title: 'Kontekst',
        paragraphs: [
          'Graff to mobilny prototyp kalendarza pracy zmianowej. Łączy miesięczny plan, oznaczenia dniówek i nocek oraz bieżące podsumowanie czasu pracy.',
        ],
      },
      {
        title: 'Problem',
        paragraphs: [
          'Grafik zmianowy powinien pozwalać szybko rozpoznać rodzaj zmiany, sprawdzić liczbę godzin i poprawić pojedynczy dzień bez przechodzenia przez rozbudowany formularz.',
        ],
      },
      {
        title: 'Kluczowe decyzje',
        paragraphs: ['Kalendarz jest jednocześnie widokiem i głównym mechanizmem edycji.'],
        items: [
          'Dniówki i nocki mają odrębne, czytelne oznaczenia kolorystyczne.',
          'Statystyki miesiąca aktualizują się wraz ze zmianami w kalendarzu.',
          'Wybranie dnia otwiera szczegóły bez opuszczania kontekstu miesiąca.',
          'Przyciski i komórki kalendarza zachowują mobilne cele dotykowe.',
        ],
      },
      {
        title: 'Prototyp / implementacja',
        paragraphs: [
          'Samodzielny prototyp HTML, CSS i JavaScript z nawigacją miesięcy, edycją rodzaju zmiany oraz przeliczaniem statystyk.',
        ],
      },
    ],
    tools: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    slug: 'suplementacja',
    title: 'Suplementacja',
    type: 'Aplikacja mobilna',
    status: 'Wersja demonstracyjna',
    summary:
      'Plan suplementów na każdy dzień: godziny, dawki, przypomnienia i prosty podgląd postępu.',
    thumbnail: '/thumbnails/suplementacja.png',
    thumbnailAlt: 'Ekran suplementacji Graff z wynikiem dnia i listą zaplanowanych dawek.',
    previews: [
      {
        label: 'Supplement widget',
        file: 'suplementacja.html',
        description: 'Działający widok dziennego planu z aktualizowanym wynikiem, dawkami i komunikatami.',
      },
    ],
    blocks: [
      {
        title: 'Kontekst',
        paragraphs: [
          'Moduł suplementacji rozwija aplikację Graff o codzienny plan dawek. Pokazuje postęp dnia oraz rozdziela wykonane, pominięte i zaplanowane suplementy.',
        ],
      },
      {
        title: 'Problem',
        paragraphs: [
          'Lista suplementów musi odpowiadać na trzy pytania bez dodatkowej nawigacji: co przyjąć, kiedy to zrobić i co zostało już wykonane.',
        ],
      },
      {
        title: 'Kluczowe decyzje',
        paragraphs: ['Widok porządkuje dzień wokół postępu i kolejności dawek.'],
        items: [
          'Wynik dnia pozostaje nad listą i reaguje na oznaczenie dawki.',
          'Spóźniona dawka otrzymuje osobny komunikat zamiast samej zmiany koloru.',
          'Każdy suplement pokazuje dawkę, relację do posiłku i godzinę.',
          'Przypomnienia i dodanie suplementu są widoczne jako osobne działania.',
        ],
      },
      {
        title: 'Prototyp / implementacja',
        paragraphs: [
          'Interaktywny HTML, CSS i JavaScript: oznaczanie wykonanych dawek, aktualizacja wskaźnika postępu oraz komunikaty dla działań.',
        ],
      },
    ],
    tools: ['HTML', 'CSS', 'JavaScript'],
  },
]

export function caseBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug)
}

export const services = [
  { title: 'Strony internetowe', text: 'Nowe strony oraz odświeżenie tych, które wymagają poprawy.' },
  { title: 'Aplikacje mobilne', text: 'Czytelne ekrany i wygodna obsługa na telefonach.' },
  { title: 'Wygląd interfejsu', text: 'Kolory, typografia i spójny wygląd całego produktu.' },
  { title: 'Działające projekty', text: 'Klikalne wersje demonstracyjne i gotowy interfejs strony.' },
] as const

export const processSteps = [
  { title: 'Poznaję cel', text: 'Ustalam, czego potrzebujesz i dla kogo powstaje projekt.' },
  { title: 'Układam rozwiązanie', text: 'Porządkuję treść i planuję najważniejsze ekrany.' },
  { title: 'Projektuję wygląd', text: 'Dobieram styl, kolory i sposób obsługi.' },
  { title: 'Uruchamiam i poprawiam', text: 'Przygotowuję działającą wersję i dopracowuję szczegóły.' },
] as const

export const principles = [
  { title: 'Najpierw cel', text: 'Każdy ekran powinien pomagać użytkownikowi zrobić konkretną rzecz.' },
  { title: 'Prosta obsługa', text: 'Projekt powinien być zrozumiały bez dodatkowych instrukcji.' },
  { title: 'Dobry wygląd ma pomagać', text: 'Kolory i typografia prowadzą wzrok do najważniejszych treści.' },
  { title: 'Dopracowanie na każdym ekranie', text: 'Strona lub aplikacja ma działać równie dobrze na telefonie i komputerze.' },
] as const

export const projectKinds = [
  'Strona internetowa',
  'Aplikacja mobilna',
  'Projekt interfejsu',
  'Poprawa istniejącej strony lub aplikacji',
] as const
