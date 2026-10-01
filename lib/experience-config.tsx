import type { Config } from "@contentful/experiences-react";
import { Text } from "@/components/primitives/Text";
import { resolveDesignToken } from "@/lib/design-tokens";
import { Button } from "@/components/primitives/Button";
import { Flex } from "@/components/primitives/Flex";
import { Image } from "@/components/primitives/Image";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";


export const experienceConfig: Config = {
 components: {
    Button,
    Flex,
    Image,
    Text,
    SiteHeader,
    SiteFooter,
 },
 resolveToken: resolveDesignToken,
};
