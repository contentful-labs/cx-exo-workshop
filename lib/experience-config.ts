import type { Config } from "@contentful/experiences-react";
import { Button } from "@/components/primitives/Button";
import { Flex } from "@/components/primitives/Flex";
import { Image } from "@/components/primitives/Image";
import { Text } from "@/components/primitives/Text";
import { resolveDesignToken } from "@/lib/design-tokens";

/** Used for fragment preview rendering; extend during the experience workshop steps. */
export const experienceConfig: Config = {
  components: {
    Button,
    Text,
    Flex,
    Image,
  },
  resolveToken: resolveDesignToken,
};
