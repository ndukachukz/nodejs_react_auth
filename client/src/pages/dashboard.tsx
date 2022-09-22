import React, { useEffect } from "react";
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import { useAuth } from "../hooks";
import { Text, Progress, Card } from "@mantine/core";

const PRIMARY_COL_HEIGHT = 300;

export default () => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  const { state } = useAuth();
  useEffect(() => {
    console.log(state.user);
  }, [state.user]);

  return (
    <Container my="md">
      <SimpleGrid
        cols={1}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Card
          withBorder
          radius="md"
          p="xl"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            {state.user?.fullName}
          </Text>
          <Text size="lg" weight={500}>
            {state.user?.score}
          </Text>
          <Progress value={state.user?.score} mt="md" size="lg" radius="xl" />
        </Card>
      </SimpleGrid>
    </Container>
  );
};
