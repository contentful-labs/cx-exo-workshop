import type { Config } from "@contentful/experiences-react";
import { Text } from "@/components/primitives/Text";
import { resolveDesignToken } from "@/lib/design-tokens";
import { Flex } from "@/components/primitives/Flex";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { Button } from "@/components/primitives/Button";
import { Image } from "@/components/primitives/Image";
import Link from "next/link";
import { SiteFooter } from "@/components/chrome/SiteFooter";

export const experienceConfig: Config = {
  components: {
    Text,
    Flex,
    Button,
    Image,
    Link,
    SiteHeader,
    SiteFooter,
  },
  resolveToken: resolveDesignToken,
};