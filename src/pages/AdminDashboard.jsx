// src/pages/AdminDashboard.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Database, ShieldAlert, PlusCircle, X, Save } from 'lucide-react';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';
import { FormField, Input, Select } from '@/components/common/Field';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add'); // Add or Edit

  const stats = [
    { label: 'Total Users', value: '1,245', icon: Users, color: 'text-brand-500', bg: 'bg-brand-500/10' },
    { label: 'Universities', value: '36', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Pending Updates', value: '4', icon: ShieldAlert, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success(`Data ${modalType === 'Add' ? 'added' : 'updated'} successfully! (Demo)`);
    setIsModalOpen(false);
  };

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-3xl font-bold text-content">Admin Portal</h1>
          <p className="text-content-muted">Manage university records and users (Phase 6 Preview)</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="card-base p-6 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-content-muted">{stat.label}</p>
              <h3 className="text-2xl font-bold text-content">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* University Records Table */}
      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-content">Recent University Records</h2>
          <Button onClick={() => handleOpenModal('Add')} size="sm">
            <PlusCircle className="w-4 h-4" /> Add New
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-content-muted whitespace-nowrap">
            <thead className="text-content border-b border-line uppercase bg-card-muted/50">
              <tr>
                <th className="px-4 py-3">University Name</th>
                <th className="px-4 py-3">Division</th>
                <th className="px-4 py-3">Programs</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {['BRAC University', 'North South University', 'Ahsanullah University of Science and Technology'].map((uni, i) => (
                <tr key={i} className="border-b border-line hover:bg-card-muted/20">
                  <td className="px-4 py-4 font-medium text-content">{uni}</td>
                  <td className="px-4 py-4">Dhaka</td>
                  <td className="px-4 py-4">15+</td>
                  <td className="px-4 py-4 text-right">
                    <Button onClick={() => handleOpenModal('Edit')} variant="ghost" size="sm" className="text-brand-600">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal (Popup) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-base w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface p-6 shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 p-2 rounded-lg hover:bg-card-muted text-content-muted"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-content mb-2">{modalType} University Record</h2>
              <p className="text-sm text-content-muted mb-6">Update tuition, credits, and admission requirements.</p>

              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="University Name" className="md:col-span-2">
                  <Input type="text" placeholder="e.g. BRAC University" required />
                </FormField>
                
                <FormField label="Division">
                  <Select>
                    <option>Dhaka</option>
                    <option>Chattogram</option>
                    <option>Sylhet</option>
                    <option>Rajshahi</option>
                  </Select>
                </FormField>

                <FormField label="Program / Department">
                  <Input type="text" placeholder="e.g. BSc CSE" required />
                </FormField>

                <FormField label="Total Credits">
                  <Input type="number" placeholder="130" />
                </FormField>

                <FormField label="Cost Per Credit (BDT)">
                  <Input type="number" placeholder="6500" />
                </FormField>

                <FormField label="Total Degree Cost (BDT)" className="md:col-span-2">
                  <Input type="text" placeholder="৳ 1,003,400" />
                </FormField>

                <FormField label="Admission Requirements (GPA / Subjects)" className="md:col-span-2">
                  <textarea 
                    rows="3" 
                    placeholder="SSC and HSC each >= 3.5, Physics + Math required..."
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-content focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 outline-none resize-none"
                  ></textarea>
                </FormField>

                <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t border-line pt-5">
                  <Button onClick={() => setIsModalOpen(false)} variant="secondary" type="button">Cancel</Button>
                  <Button type="submit"><Save className="w-4 h-4" /> Save Record</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}