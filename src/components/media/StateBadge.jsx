import { Badge } from '@/components/ui/badge';
import { STATE_COLORS } from '@/lib/constants';

export const StateBadge = ({ state }) => {
  return (
    <Badge className={STATE_COLORS[state] || STATE_COLORS.disabled} variant="secondary">
      {state}
    </Badge>
  );
};
