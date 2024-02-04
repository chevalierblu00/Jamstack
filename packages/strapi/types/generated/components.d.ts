import type { Schema, Attribute } from '@strapi/strapi';

export interface RecettesIngredient extends Schema.Component {
  collectionName: 'components_recettes_ingredients';
  info: {
    displayName: 'ingredient';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    nom: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'recettes.ingredient': RecettesIngredient;
    }
  }
}
