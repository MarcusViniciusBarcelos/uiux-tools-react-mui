#!/usr/bin/env node

/**
 * UX/UI MCP Server
 * 
 * Servidor MCP customizado para aplicar diretrizes de UX/UI em componentes React
 * com Material-UI, seguindo Heurísticas de Nielsen e Vieses Cognitivos.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// ============================================================================
// DADOS DAS DIRETRIZES UX/UI
// ============================================================================

const UX_GUIDELINES = {
  responsividade: {
    description: "Torna componente responsivo e mobile-friendly",
    instructions: `
**Responsividade Mobile-First:**

1. Use useMediaQuery do MUI:
   \`\`\`typescript
   import { useMediaQuery, useTheme } from '@mui/material';
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   \`\`\`

2. Dimensões adaptativas:
   - Mobile: calc(100vw - 16px) ou 100%
   - Desktop: valores fixos (420px, 600px, etc.)

3. Touch targets mínimo 44x44px:
   \`\`\`typescript
   <IconButton sx={{ minWidth: 44, minHeight: 44 }}>
   \`\`\`

4. Breakpoints MUI:
   - xs: 0px (mobile pequeno)
   - sm: 600px (mobile grande/tablet)
   - md: 900px (tablet grande)
   - lg: 1200px (desktop)
   - xl: 1536px (desktop grande)

5. Transições por dispositivo:
   - Mobile: Slide up
   - Desktop: Slide down ou Fade
    `,
    example: `
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

<Box
  sx={{
    width: isMobile ? 'calc(100vw - 16px)' : 420,
    height: isMobile ? '70vh' : 'min(600px, 80vh)',
  }}
>
  <Slide direction={isMobile ? 'up' : 'down'}>
    {children}
  </Slide>
</Box>
    `
  },

  materialUI: {
    description: "Aplica best practices do Material-UI",
    instructions: `
**Material-UI Best Practices:**

1. Use theme.spacing (múltiplos de 8px):
   \`\`\`typescript
   sx={{ padding: theme.spacing(2), margin: theme.spacing(1, 2) }}
   \`\`\`

2. Use alpha() para transparências:
   \`\`\`typescript
   import { alpha } from '@mui/material/styles';
   bgcolor: alpha(theme.palette.primary.main, 0.1)
   \`\`\`

3. Prefira sx prop ao invés de styled:
   \`\`\`typescript
   <Box sx={{ display: 'flex', gap: 2 }} />
   \`\`\`

4. Componentes nativos MUI:
   - Stack para layout linear
   - Box para container genérico
   - Paper para elevação/card

5. Transitions suaves:
   \`\`\`typescript
   transition: theme.transitions.create(['all'], {
     duration: theme.transitions.duration.standard,
     easing: theme.transitions.easing.easeInOut,
   })
   \`\`\`
    `,
    example: `
<Paper
  sx={{
    p: theme.spacing(3),
    bgcolor: alpha(theme.palette.background.paper, 0.95),
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }),
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[8],
    },
  }}
>
    `
  },

  appleDesign: {
    description: "Aplica padrões de design Apple",
    instructions: `
**Apple Design Patterns:**

1. Scrollbar customizada fina:
   \`\`\`typescript
   sx={{
     overflowY: 'auto',
     '&::-webkit-scrollbar': { width: 8 },
     '&::-webkit-scrollbar-thumb': {
       bgcolor: alpha(theme.palette.text.secondary, 0.2),
       borderRadius: 4,
       '&:hover': {
         bgcolor: alpha(theme.palette.text.secondary, 0.3),
       },
     },
   }}
   \`\`\`

2. Animações suaves com cubic-bezier:
   - transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'

3. Pulse animation para badges:
   \`\`\`typescript
   '@keyframes pulse': {
     '0%': { transform: 'scale(1)', opacity: 1 },
     '50%': { transform: 'scale(1.1)', opacity: 0.8 },
     '100%': { transform: 'scale(1)', opacity: 1 },
   },
   animation: 'pulse 2s infinite',
   \`\`\`

4. Design minimalista:
   - Espaçamento generoso
   - Cores neutras com acentos sutis
   - Bordas arredondadas (borderRadius: 2-3)
    `,
    example: `
<Box
  sx={{
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: 8 },
    '&::-webkit-scrollbar-thumb': {
      bgcolor: alpha(theme.palette.text.secondary, 0.2),
      borderRadius: 4,
    },
  }}
>
  <Badge
    badgeContent={count}
    sx={{
      '& .MuiBadge-badge': {
        animation: count > 0 ? 'pulse 2s infinite' : 'none',
      },
    }}
  />
</Box>
    `
  },

  nielsen1: {
    description: "Nielsen #1 - Visibilidade do Status do Sistema",
    instructions: `
**Feedback Visual Constante:**

1. Loading states em ações:
   \`\`\`typescript
   <Button disabled={isLoading}>
     {isLoading ? <CircularProgress size={20} /> : 'Salvar'}
   </Button>
   \`\`\`

2. Badges de contagem:
   \`\`\`typescript
   <Badge badgeContent={unreadCount} color="error">
   \`\`\`

3. Progress indicators:
   \`\`\`typescript
   <LinearProgress variant="determinate" value={progress} />
   \`\`\`

4. Tooltips informativos:
   \`\`\`typescript
   <Tooltip title="Carregando dados...">
   \`\`\`

5. Snackbar para confirmações:
   \`\`\`typescript
   enqueueSnackbar('Salvo com sucesso!', { variant: 'success' });
   \`\`\`
    `
  },

  nielsen2: {
    description: "Nielsen #2 - Relação Sistema-Mundo Real",
    instructions: `
**Linguagem do Usuário:**

1. Evite jargões técnicos:
   - ✅ "Conversas" ao invés de "Tickets"
   - ✅ "Taxa de conversão" ao invés de "CVR"

2. Ícones reconhecíveis:
   - NotificationsOutlined para notificações
   - PersonOutlined para usuário
   - SearchOutlined para busca

3. Ordenação natural:
   - Mais recente primeiro
   - Alfabética quando faz sentido
   - Por prioridade/urgência
    `
  },

  nielsen3: {
    description: "Nielsen #3 - Controle e Liberdade do Usuário",
    instructions: `
**Controle do Usuário:**

1. Sempre ofereça botão cancelar:
   \`\`\`typescript
   <DialogActions>
     <Button onClick={onClose}>Cancelar</Button>
     <Button variant="contained" onClick={onSave}>Salvar</Button>
   </DialogActions>
   \`\`\`

2. Ações reversíveis:
   - Botão fechar em modais
   - Confirmação antes de exclusão

3. Não trave fluxos:
   - Permita fechar/voltar a qualquer momento
    `
  },

  nielsen5: {
    description: "Nielsen #5 - Prevenção de Erros",
    instructions: `
**Prevenção de Erros:**

1. Validação em tempo real:
   \`\`\`typescript
   <TextField
     error={!!errors.cpf}
     helperText={errors.cpf?.message}
     inputProps={{ maxLength: 14, pattern: '[0-9.-]*' }}
   />
   \`\`\`

2. Placeholders demonstrativos:
   \`\`\`typescript
   placeholder="000.000.000-00"
   \`\`\`

3. Disabled states:
   \`\`\`typescript
   <Button disabled={!isValid || isLoading}>
   \`\`\`

4. Confirmação em ações destrutivas:
   \`\`\`typescript
   <ConfirmDialog
     title="Excluir item?"
     message="Esta ação não pode ser desfeita"
   />
   \`\`\`
    `
  },

  fittssLaw: {
    description: "Lei de Fitts - Targets maiores e próximos",
    instructions: `
**Lei de Fitts:**

1. Touch targets mínimo 44x44px:
   \`\`\`typescript
   <IconButton sx={{ minWidth: 44, minHeight: 44 }}>
   \`\`\`

2. Botões principais maiores:
   \`\`\`typescript
   <Button size="large" variant="contained">
   \`\`\`

3. Espaçamento adequado:
   \`\`\`typescript
   <Stack spacing={2} direction="row">
   \`\`\`

4. Ações frequentes próximas:
   - Coloque no header ou rodapé
   - Fácil acesso com polegar (mobile)
    `
  },

  groupingEffect: {
    description: "Efeito de Agrupamento - Itens relacionados juntos",
    instructions: `
**Agrupamento Visual:**

1. Stack para agrupar:
   \`\`\`typescript
   <Stack spacing={2}>
     <TextField label="Nome" />
     <TextField label="Email" />
   </Stack>
   \`\`\`

2. Divider entre seções:
   \`\`\`typescript
   <Divider sx={{ my: 2 }} />
   \`\`\`

3. Cards para contextos:
   \`\`\`typescript
   <Paper elevation={2}>
     {/* conteúdo relacionado */}
   </Paper>
   \`\`\`

4. Typography para títulos de seção:
   \`\`\`typescript
   <Typography variant="h6" sx={{ mb: 2 }}>
     Dados Pessoais
   </Typography>
   \`\`\`
    `
  },

  completeUX: {
    description: "Aplica TODAS as diretrizes de UX/UI",
    instructions: `
**Checklist Completo:**

✅ Responsividade Mobile-First
✅ Material-UI Best Practices
✅ Apple Design Patterns
✅ 10 Heurísticas de Nielsen
✅ Vieses Cognitivos (Fitts, Grouping, Proximity, etc.)

**Aplique:**
1. useMediaQuery para responsividade
2. theme.spacing para espaçamentos
3. alpha() para transparências
4. Tooltips em todos botões/ícones
5. Loading states em ações
6. Mensagens de erro claras
7. Touch targets ≥ 44px
8. Transições suaves
9. Scrollbar customizada
10. Validação em tempo real
    `
  }
};

// ============================================================================
// CRIAR SERVIDOR MCP
// ============================================================================

const server = new Server(
  {
    name: 'better-ux-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============================================================================
// LISTAR TOOLS DISPONÍVEIS
// ============================================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'apply_responsiveness',
        description: 'Aplica responsividade mobile-first em componente React/MUI',
        inputSchema: {
          type: 'object',
          properties: {
            component: {
              type: 'string',
              description: 'Código do componente ou nome do arquivo',
            },
          },
          required: ['component'],
        },
      },
      {
        name: 'apply_material_ui_best_practices',
        description: 'Aplica best practices do Material-UI (theme.spacing, alpha, sx prop)',
        inputSchema: {
          type: 'object',
          properties: {
            component: {
              type: 'string',
              description: 'Código do componente ou nome do arquivo',
            },
          },
          required: ['component'],
        },
      },
      {
        name: 'apply_apple_design',
        description: 'Aplica padrões de design Apple (scrollbar, animações, minimalismo)',
        inputSchema: {
          type: 'object',
          properties: {
            component: {
              type: 'string',
              description: 'Código do componente ou nome do arquivo',
            },
          },
          required: ['component'],
        },
      },
      {
        name: 'apply_nielsen_heuristic',
        description: 'Aplica uma heurística específica de Nielsen',
        inputSchema: {
          type: 'object',
          properties: {
            component: {
              type: 'string',
              description: 'Código do componente ou nome do arquivo',
            },
            heuristic: {
              type: 'string',
              enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
              description: 'Número da heurística (1-10)',
            },
          },
          required: ['component', 'heuristic'],
        },
      },
      {
        name: 'apply_cognitive_bias',
        description: 'Aplica viés cognitivo específico para melhor UX',
        inputSchema: {
          type: 'object',
          properties: {
            component: {
              type: 'string',
              description: 'Código do componente ou nome do arquivo',
            },
            bias: {
              type: 'string',
              enum: ['fitts', 'grouping', 'proximity', 'zeigarnik', 'serial-position', 'hicks'],
              description: 'Viés cognitivo a aplicar',
            },
          },
          required: ['component', 'bias'],
        },
      },
      {
        name: 'apply_complete_ux',
        description: 'Aplica TODAS as diretrizes de UX/UI (responsividade, MUI, Apple, Nielsen, vieses)',
        inputSchema: {
          type: 'object',
          properties: {
            component: {
              type: 'string',
              description: 'Código do componente ou nome do arquivo',
            },
          },
          required: ['component'],
        },
      },
      {
        name: 'get_ux_checklist',
        description: 'Retorna checklist de UX/UI para validação',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// ============================================================================
// EXECUTAR TOOLS
// ============================================================================

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'apply_responsiveness':
        return {
          content: [
            {
              type: 'text',
              text: `${UX_GUIDELINES.responsividade.instructions}\n\n**Exemplo:**\n${UX_GUIDELINES.responsividade.example}\n\n**Componente:** ${args.component}`,
            },
          ],
        };

      case 'apply_material_ui_best_practices':
        return {
          content: [
            {
              type: 'text',
              text: `${UX_GUIDELINES.materialUI.instructions}\n\n**Exemplo:**\n${UX_GUIDELINES.materialUI.example}\n\n**Componente:** ${args.component}`,
            },
          ],
        };

      case 'apply_apple_design':
        return {
          content: [
            {
              type: 'text',
              text: `${UX_GUIDELINES.appleDesign.instructions}\n\n**Exemplo:**\n${UX_GUIDELINES.appleDesign.example}\n\n**Componente:** ${args.component}`,
            },
          ],
        };

      case 'apply_nielsen_heuristic':
        const nielsenKey = `nielsen${args.heuristic}`;
        const nielsen = UX_GUIDELINES[nielsenKey];
        if (!nielsen) {
          return {
            content: [
              {
                type: 'text',
                text: `Heurística ${args.heuristic} não encontrada. Use 1-10.`,
              },
            ],
            isError: true,
          };
        }
        return {
          content: [
            {
              type: 'text',
              text: `**${nielsen.description}**\n\n${nielsen.instructions}\n\n**Componente:** ${args.component}`,
            },
          ],
        };

      case 'apply_cognitive_bias':
        const biasMap = {
          fitts: 'fittssLaw',
          grouping: 'groupingEffect',
        };
        const biasKey = biasMap[args.bias];
        const bias = UX_GUIDELINES[biasKey];
        if (!bias) {
          return {
            content: [
              {
                type: 'text',
                text: `Viés ${args.bias} não encontrado.`,
              },
            ],
            isError: true,
          };
        }
        return {
          content: [
            {
              type: 'text',
              text: `**${bias.description}**\n\n${bias.instructions}\n\n**Componente:** ${args.component}`,
            },
          ],
        };

      case 'apply_complete_ux':
        return {
          content: [
            {
              type: 'text',
              text: `${UX_GUIDELINES.completeUX.instructions}\n\n**Componente:** ${args.component}\n\nAplique TODAS as diretrizes acima no componente especificado.`,
            },
          ],
        };

      case 'get_ux_checklist':
        return {
          content: [
            {
              type: 'text',
              text: `
**Checklist UX/UI - better2 Frontend**

Antes de finalizar qualquer componente visual:

- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Touch targets ≥ 44px
- [ ] Todos botões/ícones têm tooltip
- [ ] Loading states implementados
- [ ] Mensagens de erro claras
- [ ] Theme.spacing usado
- [ ] Alpha() para transparências
- [ ] Transições suaves
- [ ] Acessibilidade (tab navigation)
- [ ] Testado em mobile real
- [ ] Scrollbar customizada (se lista/scroll)
- [ ] Validação em tempo real (se formulário)
- [ ] Botão cancelar (se modal/dialog)
- [ ] Feedback visual em ações
- [ ] Agrupamento lógico de elementos
              `,
            },
          ],
        };

      default:
        return {
          content: [
            {
              type: 'text',
              text: `Tool desconhecida: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Erro ao executar tool: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// ============================================================================
// INICIAR SERVIDOR
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('better UX/UI MCP Server rodando via stdio');
}

main().catch((error) => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
