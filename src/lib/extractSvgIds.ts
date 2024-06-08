/// <reference types="node" />
import db from '@/db';
import { Diagram } from '@prisma/client';
import sax, { Tag } from 'sax';

const isFeature = (tag: Tag) => {
  return tag.attributes.hasOwnProperty('inkscape:label')
}

export default async function extractSvgIds(diagram: Diagram) {
  const svgData = diagram.svgData.toString();
  const parser = sax.parser(true, { lowercase: true, trim: true });

  console.log(`Extracting SVG ids from diagram ${diagram.title} ...`);
  parser.onopentag = async (tag: Tag) => {
    const { attributes } = tag;

    if (isFeature(tag)) {
      const {
        id: svgId,
        "inkscape:label": label
      } = attributes;
      const featureExists = await db.feature.count({ where: { svgId } }) > 0;

      if (!featureExists) {
        console.log(`creating feature: ${svgId}`);
        await db.feature.create({
          data: {
            svgId,
            diagramId: diagram.id,
            name: label,
          }
        });
      }
    }
  };

  parser.write(svgData).close();

  console.log(`Done extracting SVG ids from diagram ${diagram.title}`);
}
