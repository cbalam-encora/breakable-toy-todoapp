import { Card } from '@/components/ui';

const Stats = () => {
  return (
    <Card className="p-4 flex">
            <Card className="flex-1">
              Average time to finish tasks:
              22:15 minutes
              </Card>

              <Card className="flex-1">
              Average time to finish tasks by priority:
              Low: 10:15 minutes
              Medium: 20:15 minutes
              High: 30:15 minutes
              </Card>
            </Card>
  )
}

export default Stats