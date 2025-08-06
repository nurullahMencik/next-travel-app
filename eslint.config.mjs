import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Prisma tarafından oluşturulan dosyaları dışlamak için
  {
    // 'ignore' özelliği, eşleşen dosyaları linting işleminden hariç tutar.
    ignores: ["lib/generated/**"],
  },
];

export default eslintConfig;