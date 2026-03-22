import path from 'path';
import type { Plugin } from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

const providerSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  icon: Joi.string().required(),
  description: Joi.string(),
});

const DEFAULT_PROVIDERS = [
  { name: 'ChatGPT', url: 'https://chatgpt.com/?q={prompt}', icon: 'chatgpt' },
  { name: 'Claude', url: 'https://claude.ai/new?q={prompt}', icon: 'claude' },
];

export default function themeAskAi(): Plugin {
  return {
    name: 'docusaurus-theme-ask-ai',

    getThemePath() {
      return path.resolve(__dirname, 'theme');
    },

    getTypeScriptThemePath() {
      return path.resolve(__dirname, '..', 'src', 'theme');
    },
  };
}

export function validateThemeConfig({
  validate,
  themeConfig,
}: {
  validate: (schema: any, config: any) => any;
  themeConfig: any;
}) {
  const schema = Joi.object({
    askAi: Joi.object({
      buttonText: Joi.string().default('Use with AI'),
      position: Joi.string().valid('fixed', 'breadcrumb').default('fixed'),
      showCopyMarkdown: Joi.boolean().default(true),
      showViewMarkdown: Joi.boolean().default(true),
      showLlmsTxt: Joi.boolean().default(true),
      promptPrefix: Joi.string().default(
        'Use the following {title} documentation to help me:\n\n',
      ),
      maxPromptLength: Joi.number().integer().min(100).default(7500),
      providers: Joi.array().items(providerSchema).default(DEFAULT_PROVIDERS),
      skill: Joi.object({
        command: Joi.string().required(),
        name: Joi.string().required(),
      }).optional(),
    }).default(),
  });
  return validate(schema, themeConfig);
}
