import React, { useMemo } from 'react';

import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Item, CheckinTitle, CheckinDate } from './styles';

export default function CheckinItem({ data, number }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: ptBR,
      addSuffix: true,
    });
  }, [data.created_at]);

  return (
    <Item>
      <CheckinTitle>Check-in #{number}</CheckinTitle>
      <CheckinDate>{dateParsed}</CheckinDate>
    </Item>
  );
}
