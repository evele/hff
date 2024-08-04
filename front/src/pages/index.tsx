import { ConditionalTransferAbi } from '@/abi/ConditionalTransfer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { CONDITIONAL_TRANSFER_ADDRESS } from '@/constants';
import useCreateClient from '@/hooks/use-create-client';
import { useEffect, useState } from 'react';
import { getContract, parseEther } from 'viem';
import { useAccount } from 'wagmi';

export default function App() {
  const [formData, setFormData] = useState<{
    id: string;
    sendTo: `0x${string}` | null | undefined;
    message: string;
    amount: string;
    token: string;
    expires: Date | undefined;
    paymentStatus: string;
  }>({
    id: Math.random().toString(36).substring(2, 8),
    sendTo: '0x40EA49528CCAdE6D7B2e59510dc162FD0bFa895D',
    message: 'mensaje de prueba',
    amount: '0.000001',
    token: 'eth',
    expires: undefined,
    paymentStatus: 'waiting',
  });

  const [contract, setContract] = useState<any>(null);

  const account = useAccount();
  const { publicClient, walletClient } = useCreateClient();

  useEffect(() => {
    if (walletClient && publicClient) {
      const contract = getContract({
        address: CONDITIONAL_TRANSFER_ADDRESS,
        abi: ConditionalTransferAbi,
        client: { public: publicClient, wallet: walletClient },
      });

      contract.watchEvent.TransactionProposed(
        { sender: account.address, receiver: formData.sendTo },
        {
          onLogs(logs) {
            console.log(logs);
          },
        },
      );
    }
  }, [formData.sendTo, walletClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contract && formData.sendTo && account.address) {
      try {
        const result = await contract.write.proposeTransaction(
          [formData.sendTo, parseEther(formData.amount)],
          {
            account: account.address,
          },
        );
        console.log({ result });
      } catch (error) {
        console.error(error, error.message);
        alert('Transaction Failed!');
      }
    } else {
      alert('Provider or contract not set!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value.trim(),
    }));
  };

  return (
    <section className="h-full flex flex-col items-center justify-center gap-4 text-2xl font-bold">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Send Payment</CardTitle>
          <CardDescription>Fill out the form to send a payment.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="sendTo">Send To</Label>
              <Input
                id="sendTo"
                type="text"
                placeholder="Enter recipient address"
                autoComplete="off"
                value={formData.sendTo || ''}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter a message"
                className="min-h-[100px]"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expires">Expires</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start font-normal">
                      {formData.expires ? formData.expires.toLocaleDateString() : 'Select date'}
                      <div className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.expires}
                      onSelect={(value) =>
                        setFormData((prevState) => ({ ...prevState, expires: value! }))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  autoComplete="off"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="token">Token</Label>
              <Input
                id="token"
                type="text"
                placeholder="Enter token"
                autoComplete="off"
                value={formData.token}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Send Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

