import {
  Card,
  Col,
  Container,
  Row,
  Link,
  Text,
  Spacer,
} from "@nextui-org/react";
import { Layout } from "components/Layout";
// import Image from "next/image";

import fs, { stat } from "fs/promises";
import NextLink from "next/link";
import { Box } from "components/Box";
import Image from "next/image";

export default function Comic({
  id,
  title,
  img,
  alt,
  height,
  width,
  prevComicId,
  nextComicId,
  hasPrevPage,
  hasNextPage,
}) {
  return (
    <Layout title={`xkcd - ${title}`}>
      <Container
        responsive
        sm
        display="flex"
        alignItems="center"
        direction="column"
      >
        <Text h2>{title}</Text>
        <Box>
          <Image src={img} width={width} height={height} alt={alt} />
        </Box>
        <Text>{alt}</Text>
        <Spacer />
        <Container display="flex" justify="space-between">
          <div>
            {hasPrevPage && (
              <NextLink href={`/comic/${prevComicId}`}>
                <Link color={"primary"}>Prev</Link>
              </NextLink>
            )}
          </div>
          <div>
            {hasNextPage && (
              <NextLink href={`/comic/${nextComicId}`}>
                <Link color={"primary"} block>
                  Next
                </Link>
              </NextLink>
            )}
          </div>
        </Container>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const comicFiles = await fs.readdir("./comics");

  let paths = [];

  locales.forEach((locale) => {
    paths = paths.concat(
      comicFiles.map((comicFile) => ({
        params: { id: comicFile.replace(".json", "") },
        locale,
      }))
    );
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const content = await fs.readFile(`./comics/${params.id}.json`, {
    encoding: "utf-8",
  });
  const comic = JSON.parse(content);

  const currentId = +params.id;
  const prevComicId = currentId - 1;
  const nextComicId = currentId + 1;

  const [prevComicStatus, nextComicStatus] = await Promise.allSettled([
    stat(`./comics/${prevComicId}.json`),
    stat(`./comics/${nextComicId}.json`),
  ]);

  const hasPrevPage = prevComicStatus.status === "fulfilled";
  const hasNextPage = nextComicStatus.status === "fulfilled";

  return {
    props: { hasPrevPage, hasNextPage, prevComicId, nextComicId, ...comic },
  };
}
