import { motion } from 'framer-motion';
import Card from './Card';

interface DefinitionProps {
  term: string;
  definition: string;
  details?: string;
  index: number;
}

export default function Definition({
  term,
  definition,
  details,
  index,
}: DefinitionProps) {
  return (
    <Card delay={index} variant="default">
      <div className="space-y-3">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
          className="text-xl font-bold gradient-text"
        >
          {term}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-white font-medium"
        >
          "{definition}"
        </motion.p>

        {details && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            viewport={{ once: true }}
            className="text-text-secondary text-sm leading-relaxed"
          >
            {details}
          </motion.p>
        )}
      </div>
    </Card>
  );
}
