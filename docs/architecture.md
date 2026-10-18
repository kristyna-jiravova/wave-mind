# Technické poznámky k architektuře e-shopu WAVE MIND.

Tento dokument slouží k pochopení použitých technologií, struktury projektu a komunikace mezi frontendem, backendem a databází. Zatím v českém jazyce pro vlastní potřebu.

## 1. Použité technologie

| Technologie    | Účel                                                         |
| -------------- | ------------------------------------------------------------ |
| Next.js        | Framework pro React aplikaci, poskytuje také serverovou část |
| React          | Tvorba uživatelského rozhraní pomocí komponent               |
| TypeScript     | Typová kontrola kódu                                         |
| Tailwind CSS   | Stylování uživatelského rozhraní                             |
| tRPC           | Typově bezpečná komunikace mezi klientem a serverem          |
| Zod            | Validace dat za běhu aplikace                                |
| TanStack Query | Správa načítání, aktualizací a cache serverových dat         |
| Supabase       | PostgreSQL databáze a další backendové služby                |

## 2. tRPC

tRPC = _TypeScript Remote Procedure Call_.

Umožňuje klientovi volat procedury definované na serveru. Hlavní výhodou je sdílení typových informací mezi serverem a klientem bez nutnosti ručně definovat samostatné API typy.
V tomto případě používá serverovou část Next.js.

### Základní pojmy

- **Query** – tRPC procedura určená pro získávání dat.
- **Mutation** – tRPC procedura obvykle používaná pro změnu dat.

## 3. Struktura tRPC

```text
src/
├── app/
│   └── api/
│       └── trpc/
│           └── [trpc]/
│               └── route.ts
└── server/
    └── api/
        ├── routers/
        │   └── test.ts
        ├── root.ts
        └── trpc.ts
```

### `trpc.ts`

Základní konfigurace tRPC.

Pomocí `initTRPC.create()` jsem vytvořila instanci tRPC, ze které získávám nástroje pro vytváření routerů a procedur.

### `test.ts`

V tomto souboru jsem vytvořila testovací router `testRouter` s procedurou `greet`.

Procedura:

1. Přijme vstupní objekt s vlastností `name`.
2. Pomocí Zodu ověří, že `name` je text.
3. Vrátí objekt s pozdravem.

### `root.ts`

Vytvořila jsem hlavní router `appRouter`, který sdružuje jednotlivé routery aplikace.

```ts
export const appRouter = createTRPCRouter({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
```

`test` je název, pod kterým jsem zaregistrovala `testRouter`.

`AppRouter` je TypeScript typ odvozený z hlavního routeru. Používám ho na klientské straně pro typově bezpečné volání serverových procedur.

### `route.ts`

Propojila jsem tRPC se serverovou částí Next.js pomocí HTTP Route Handleru.

K tomu používám `fetchRequestHandler` z knihovny tRPC, kterému předávám příchozí požadavek, hlavní router a funkci pro vytvoření kontextu.

```ts
export { handler as GET, handler as POST };
```

Tím jsem zpřístupnila stejný handler pro HTTP metody GET a POST.

### `createContext`

```ts
createContext: () => ({}),
```

tRPC zavolá tuto funkci při přípravě kontextu požadavku. Zatím vrací prázdný objekt, protože žádné společné informace nepotřebuji.

Později do kontextu mohu přidat například informace o přihlášeném uživateli. Při jeho rozšíření bude potřeba upravit také konfiguraci a typování kontextu v tRPC.

## 4. Zpracování HTTP požadavku

Příklad testovací procedury `test.greet`:

1. Klient odešle HTTP požadavek na `/api/trpc/test.greet`.
2. Next.js předá požadavek do `route.ts`.
3. `fetchRequestHandler` zpracuje požadavek pomocí `appRouter`.
4. tRPC najde router `test` a proceduru `greet`.
5. Zod ověří vstupní data.
6. Procedura vytvoří odpověď.
7. Server vrátí JSON klientovi.

Funkčnost API jsem ověřila odesláním HTTP požadavku v prohlížeči. Server správně vrátil JSON odpověď.

## 5. Nastavení tRPC klienta a TanStack React Query

Po dokončení serverové části jsem nastavila klientskou integraci, která umožňuje volat tRPC procedury přímo z React komponent.

Pro komunikaci využívám **tRPC Client** a **TanStack Query**. tRPC zajišťuje typově bezpečné volání serverových procedur, zatímco TanStack Query spravuje načítání dat, cache a chybové stavy.

### `src/trpc/client.tsx`

Vytvořila jsem React integraci pomocí `createTRPCContext<AppRouter>()`.

Typ `AppRouter` se přebírá ze serverové části pomocí `import type`. Klient díky tomu zná dostupné procedury, jejich vstupní parametry a návratové hodnoty, aniž by potřeboval načítat serverovou implementaci.

Soubor zpřístupňuje `TRPCProvider` a hooky `useTRPC` a `useTRPCClient`.

### `src/trpc/providers.tsx`

Nastavila jsem `QueryClient` pro TanStack Query a tRPC klienta pomocí `createTRPCClient<AppRouter>()`.

Pro komunikaci používám `httpBatchLink` s endpointem `/api/trpc`, který jsem již nastavila v Next.js.

Oba klienty jsem propojila pomocí `QueryClientProvider` a `TRPCProvider`, aby byly dostupné vnořeným React komponentám.

Pomocí `useState` uchovávám instance klientů mezi běžnými překresleními komponenty.

### `src/app/layout.tsx`

Do hlavního layoutu jsem přidala komponentu `Providers`:

```tsx
<Providers>{children}</Providers>
```

Díky tomu mohou klientské komponenty aplikace využívat tRPC a TanStack Query. Samotný layout zůstává serverovou komponentou.

## 6. Ověření komunikace mezi frontendem a backendem

Pro ověření klientské integrace jsem vytvořila testovací React komponentu `src/components/TrpcTest.tsx`.

Komponenta využívá hook `useTRPC()` pro přístup k serverovým procedurám a `useQuery()` z TanStack Query pro načtení dat.

```tsx
const { data, isLoading, error } = useQuery(trpc.test.greet.queryOptions({ name: "Kristyna" }));
```

TanStack Query zde spravuje získaná data, stav načítání a případnou chybu.

Testovací komponentu jsem následně přidala do `src/app/page.tsx`.

### Ověření funkčnosti

- Spustila jsem `npm run typecheck`, který proběhl bez chyb.
- Pomocí `npm run dev` jsem spustila aplikaci.
- Na hlavní stránce se úspěšně zobrazila odpověď `Hello, Kristyna!`.

Tím jsem ověřila funkční komunikaci mezi Reactem, TanStack Query, tRPC klientem a serverovou procedurou v Next.js.

## 7. Nastavení Supabase

**Supabase** je backendová platforma poskytující PostgreSQL databázi, autentizaci uživatelů, úložiště souborů a další služby.

Pro WAVE MIND jsem vytvořila organizaci `WAVE MIND` a projekt `wave-mind` na bezplatném tarifu.

### Konfigurace projektu

Při vytváření projektu jsem ponechala zapnuté **Data API**, vypnula automatické zpřístupňování nových tabulek a zapnula automatické **RLS (Row Level Security)**.

Přístup k jednotlivým tabulkám tak mohu řídit pomocí databázových oprávnění a RLS pravidel.

Základní pojmy:

- **`anon`** – databázová role používaná pro nepřihlášené požadavky.

### Nastavení připojení v Next.js

Nainstalovala jsem oficiální knihovnu `@supabase/supabase-js`, která umožňuje komunikaci se Supabase z JavaScriptu a TypeScriptu.

Konfiguraci připojení jsem uložila do souboru `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Proměnné prostředí umožňují oddělit konfiguraci od zdrojového kódu. Předpona `NEXT_PUBLIC_` označuje hodnoty, které mohou být dostupné také v prohlížeči.

Soubor `.env.local` je ignorovaný Gitem pomocí pravidla `.env*` v `.gitignore`. Tajné klíče ani databázové heslo nejsou součástí zdrojového kódu.

### `src/lib/supabase.ts`

Vytvořila jsem Supabase klienta pomocí funkce `createClient()` z knihovny `@supabase/supabase-js`.

Klient načítá konfiguraci z proměnných prostředí a umožňuje komunikovat se Supabase Data API. Součástí je také kontrola přítomnosti požadovaných proměnných.

Použitý publishable key neposkytuje administrátorský přístup k databázi. Přístup k datům závisí na databázových oprávněních a RLS pravidlech.

### Testovací tabulka a oprávnění

Pro ověření připojení jsem vytvořila tabulku `connection_test` se sloupci `id`, `created_at` a `message` a vložila testovací záznam `Hello from Supabase!`.

U tabulky jsem ponechala zapnuté RLS a nastavila:

- RLS policy pro roli `anon`, operaci `SELECT` a podmínku `true`.
- Databázové oprávnění `GRANT SELECT` pro roli `anon`.

Tím je povolené anonymní čtení testovací tabulky, nikoliv její anonymní zápis nebo úpravy.

U skutečných tabulek e-shopu bude potřeba nastavit oprávnění podle jejich účelu, zejména u objednávek a zákaznických údajů.

### Ověření připojení k databázi

Do testovacího tRPC routeru jsem přidala proceduru `test.checkDatabase`, která pomocí Supabase klienta načítá data z tabulky `connection_test`.

```ts
const { data, error } = await supabase.from("connection_test").select("message").single();
```

Funkčnost jsem ověřila prostřednictvím endpointu `/api/trpc/test.checkDatabase`, který úspěšně vrátil uložený záznam.

Tím bylo ověřeno propojení **Next.js → tRPC → Supabase Data API → PostgreSQL**.

### Označení `API DISABLED`

V Supabase Dashboardu se u tabulky `connection_test` stále zobrazuje označení `API DISABLED`, přestože načítání dat přes API funguje.

Databázové oprávnění `SELECT` pro roli `anon` bylo ověřeno s výsledkem `true` a testovací záznam se podařilo načíst přes tRPC.

Přesná příčina nesouladu v dashboardu zatím není potvrzená. Protože připojení funguje, další změny oprávnění jsem neprováděla.

## Poznámky k JavaScriptu a TypeScriptu

- `typeof` – v TypeScriptovém typovém kontextu získá typ existující hodnoty.
- `${value}` – vložení hodnoty do template literalu.
- import type – import pouze typových informací bez načítání implementace za běhu.
- <AppRouter> – generický typový parametr, díky kterému klient zná typy serverového API.
- useQuery – React hook z TanStack Query pro načítání a správu serverových dat.

## Plánovaná architektura

Komunikace při práci se serverovými daty v klientských React komponentách:

```text
React – klientská komponenta
        ↓
TanStack Query
        ↓
tRPC Client
        ↓ HTTP
Next.js + tRPC Server
        ↓
Supabase (PostgreSQL)
```

Propojení Reactu, TanStack Query a tRPC je funkční. Připojení Supabase k Next.js backendu bylo také ověřeno načtením testovacího záznamu z PostgreSQL.

TanStack Query spravuje načítání, cache a aktualizace serverových dat v klientských komponentách.

Některé stránky mohou načítat data přímo na serveru pomocí Next.js Server Components, bez využití TanStack Query.

## Aktuální stav

**Hotovo:**

- Základní konfigurace tRPC.
- Hlavní router a testovací procedura test.greet.
- HTTP propojení tRPC s Next.js.
- Validace vstupních dat pomocí Zodu.
- Nastavení tRPC klienta.
- Propojení TanStack Query s Reactem.
- Nastavení providerů v hlavním layoutu.
- Úspěšné ověření komunikace mezi frontendem a backendem.
- Nastavení Supabase klienta a proměnných prostředí.
- Vytvoření testovací tabulky a nastavení RLS oprávnění.
- Úspěšné načtení dat z PostgreSQL přes tRPC.
- Vytvoření .env.example a úprava .gitignore.
- Kontrola TypeScriptu bez chyb.

**Zbývá:**

- Zkontrolovat a případně uklidit testovací kód.
