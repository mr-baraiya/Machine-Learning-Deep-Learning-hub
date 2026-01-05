import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TreeDeciduous, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function CompareChart({ predictions }) {
  const { random_forest, logistic_regression } = predictions;

  const data = [
    {
      name: 'Random Forest',
      probability: (random_forest.probability * 100).toFixed(2),
      risk: random_forest.prediction,
    },
    {
      name: 'Logistic Regression',
      probability: (logistic_regression.probability * 100).toFixed(2),
      risk: logistic_regression.prediction,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-purple-200">
          <p className="font-bold text-gray-800 mb-2">{payload[0].payload.name}</p>
          <p className="text-purple-600 font-semibold">
            Probability: {payload[0].value}%
          </p>
          <p className={`font-semibold ${payload[0].payload.risk === 1 ? 'text-red-600' : 'text-green-600'}`}>
            {payload[0].payload.risk === 1 ? '⚠️ Risk Detected' : '✓ No Risk'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white rounded-3xl p-8 shadow-2xl mt-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Model Comparison Chart</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="rfGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="lrGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#4b5563', fontWeight: 600 }}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <YAxis 
            label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft', fill: '#4b5563', fontWeight: 600 }}
            tick={{ fill: '#4b5563', fontWeight: 600 }}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="probability" radius={[10, 10, 0, 0]} barSize={100}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? 'url(#rfGradient)' : 'url(#lrGradient)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Random Forest</p>
              <p className="text-2xl font-bold text-green-600">
                {(random_forest.probability * 100).toFixed(2)}%
              </p>
            </div>
            <TreeDeciduous className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Logistic Regression</p>
              <p className="text-2xl font-bold text-purple-600">
                {(logistic_regression.probability * 100).toFixed(2)}%
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CompareChart;
